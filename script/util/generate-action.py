# CREATE REDUX ACTION TEMPLATE AND ACTION AUTOMATICALLY
# arg1: path
# arg2: action_name
# arg3~: action_parameters
import sys
import os, os.path
import re

def find_bracket(lines, bracket_open, bracket_close, row, column):
  # bracket_open is one of ['(', '[', '{', '<']
  # bracket_close is pair bracket of bracket_open
  # row and column is the location of starting bracket_open in lines
  i = row
  while(i<len(lines)):
    j = 0
    if i==row:
      j = column+1
    line = lines[i]
    while(j<len(line)):
      c = line[j]
      if c == bracket_open:
        i, j = find_bracket(lines, bracket_open, bracket_close, i, j);
        line = lines[i]
        j+=1
        continue
      if c == bracket_close:
        return i, j
      j+=1
    i+=1
  return i, j

def get_inner_path(path):
  ret = path
  ret = ret.replace('./src/container/', '')
  ret = ret.replace('src/container/', '')
  ret = ret.replace('./src/resource/', '')
  ret = ret.replace('src/resource/', '')
  ret = ret.replace('./src/', '')
  ret = ret.replace('src/', '')
  return ret

def get_outter_dir(path):
  ret = path
  ret = ret.replace('./src/', '')
  ret = ret.replace('src/', '')
  ret = ret.split('/')[0]
  return ret

def make_action_type(action, file_name):
  action_type = file_name
  i=0
  while(i<len(action_type)-1):
    if(not action_type[i].istitle() and action_type[i+1].istitle()):
      action_type = action_type[:i+1] + "_" + action_type[i+1:]
      i+=1
    i+=1
  action_type = "_".join(re.findall('[A-Z]?[a-z]+', action)).upper() + '__' + action_type.upper()
  return action_type


container = ""
action = sys.argv[2] if len(sys.argv) > 2 else ""         # ex) show
action_argvs = sys.argv[3:] if len(sys.argv) > 3 else []  # ex) [arg1, arg2]
inner_path = get_inner_path(sys.argv[1])          # ex) team/TeamCreateModal or common/pending
outter_dir = get_outter_dir(sys.argv[1])          # one of ['container', 'resource']
file_name = inner_path.split('/')[-1]            # capitalize ex) TeamCreateModal
file_name_nc = file_name[0].lower() + file_name[1:] # non capitalize ex) teamCreateModal
action_type = make_action_type(action, file_name)    # ex) OPEN_TEAM_CREATE_MODAL
dir_url = outter_dir + "/" + inner_path             # ex) container/team/TeamCreateModal]
dir_path = "src/" + dir_url               # ex) src/container/team/TeamCreateModal
full_path = dir_path + '/' + file_name


#file urls
files_url = {
  'js': dir_url + '/' + file_name,
  'scss': dir_url + '/' + file_name + '.scss',
  'thunk': dir_url + '/' + file_name + '.thunk',
  'action': dir_url + '/' + file_name + '.action',
  'reducer': dir_url + '/' + file_name + '.reducer'
}

#file paths
files_path = {
  'js': full_path + '.js',
  'scss': full_path + '.scss',
  'thunk': full_path + '.thunk.js',
  'action': full_path + '.action.js',
  'reducer': full_path + '.reducer.js'
}

def process_action(lines):
  print 'process_action'
  i=0
  target_idx = 0
  for i, line in enumerate(lines):
    if 'export const %sActionTypes'%(file_name) in line:
      target_i, target_j = find_bracket(lines, "{", "}", i, len(lines[i])-1)
      lines.insert(target_i, "  %s: '%s',\n"%(action_type, action_type))
      break
  lines.append("\nexport const %s = makeActionCreator(\n"%(action))
  lines.append("  %sActionTypes.%s,\n"%(file_name, action_type))
  for i, action_argv in enumerate(action_argvs):
    lines.append("  '%s',\n"%(action_argv))
  lines.append(");\n"%())
  return ''.join(lines)

#directory generator
if not os.path.exists(dir_path):
    raise Exception('directory not exists : %s'%(dir_path))

#check target fiels is exists
if not os.path.exists(files_path['action']):
    raise Exception('file not exists : %s'%(files_path['action']))

#create action functions
if(action):
  #read
  files_r = {
    'action': open(files_path['action'], 'r'),
  }

  #process
  action_js = process_action(files_r['action'].readlines())
  files_r['action'].close()

  #write
  files_w = {
    'action': open(files_path['action'], 'w'),
  }
  files_w['action'].write(action_js)
  files_w['action'].close()

print(file_name,action,action_argvs)

