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


container = ""
targets = sys.argv[2] if len(sys.argv) > 2 else "jstar"         # ex) * or jstar
inner_path = get_inner_path(sys.argv[1])          # ex) team/TeamCreateModal or common/pending
outter_dir = get_outter_dir(sys.argv[1])          # one of ['container', 'resource']
file_name = inner_path.split('/')[-1]            # capitalize ex) TeamCreateModal
file_name_nc = file_name[0].lower() + file_name[1:] # non capitalize ex) teamCreateModal
dir_url = outter_dir + "/" + inner_path             # ex) container/team/TeamCreateModal]
dir_path = "src/" + dir_url               # ex) src/container/team/TeamCreateModal
full_path = dir_path + '/' + file_name


#file urls
files_url = {
  'js': dir_url + '/' + file_name,
  'scss': dir_url + '/' + file_name + '.scss',
  'thunk': dir_url + '/' + file_name + '.thunk',
  'action': dir_url + '/' + file_name + '.action',
  'reducer': dir_url + '/' + file_name + '.reducer',
  'reducer_test': dir_url + '/' + file_name + '.reducer.test'
}

#file paths
files_path = {
  'js': full_path + '.js',
  'scss': full_path + '.scss',
  'thunk': full_path + '.thunk.js',
  'action': full_path + '.action.js',
  'reducer': full_path + '.reducer.js',
  'reducer_test': full_path + '.reducer.test.js',
}

#templates
def container_js_template():
  lines = []
  lines.append("/* external */")
  lines.append("import React, { Component } from 'react';")
  lines.append("import { connect } from 'react-redux';")
  lines.append("import { compose } from 'general/util/fp';")
  lines.append("/* internal */")
  lines.append("/* feature */")
  lines.append("import mapDispatchToProps from './%s.thunk';"%(file_name))
  lines.append("import './%s.css';"%(file_name))
  lines.append("")
  lines.append("class %s extends Component {"%(file_name))
  lines.append("  render() {")
  lines.append("    return ();")
  lines.append("  }")
  lines.append("}")
  lines.append("")
  lines.append("const mapStateToProps = (state) => {")
  lines.append("  return {")
  lines.append("  };")
  lines.append("};")
  lines.append("")
  lines.append("%s.propTypes = {"%(file_name))
  lines.append("};")
  lines.append("")
  lines.append("%s.defaultPropTypes = {"%(file_name))
  lines.append("};")
  lines.append("")
  lines.append("export const %sView = %s;"%(file_name, file_name))
  lines.append("")
  lines.append("export default compose(")
  lines.append("  connect(mapStateToProps, mapDispatchToProps),")
  lines.append(")(%sView);"%(file_name))
  lines.append("")
  return '\n'.join(lines)

def container_scss_template():
  lines = []
  lines.append("@import 'general/scss/variable.scss';")
  lines.append("")
  lines.append(".%s {"%(file_name))
  lines.append("}\n")
  return '\n'.join(lines)

def container_thunk_template():
  lines = []
  lines.append("/* external */")
  lines.append("import { makeMapDispatchToProps } from 'general/util/redux';")
  lines.append("")
  lines.append("/*")
  lines.append("export const example = () => async (dispatch, getState) => {")
  lines.append("  const response = await exampleApi();")
  lines.append("};")
  lines.append("*/")
  lines.append("")
  lines.append("export default makeMapDispatchToProps({")
  lines.append("  // example,")
  lines.append("});")
  lines.append("")
  return '\n'.join(lines)

def action_template():
  lines = []
  lines.append("import { makeActionCreator } from 'general/util/redux';")
  lines.append("")
  lines.append("export const %sActionTypes = {"%(file_name))
  lines.append("};\n")
  return '\n'.join(lines)

def reducer_template():
  lines = []
  lines.append("/* external */")
  lines.append("import { Map } from 'immutable';")
  lines.append("import PropTypes from 'prop-types';")
  lines.append("/* internal */")
  lines.append("import { handleActions } from 'general/util/redux';")
  lines.append("/* feature */")
  lines.append("import { %sActionTypes } from './%s.action';"%(file_name, file_name))
  lines.append("")
  lines.append("export const %sPropTypes = {"%(file_name))
  lines.append("};")
  lines.append("")
  lines.append("export const initialState = Map({")
  lines.append("});")
  lines.append("")
  lines.append("export const %sReducer = handleActions({"%(file_name))
  lines.append("}, initialState);\n")

  return '\n'.join(lines)

def reducer_test_template():
  lines = []
  lines.append("/* feature */")
  lines.append("import { %sReducer, initialState } from './%s.reducer';"%(file_name, file_name))
  lines.append("")
  lines.append("describe('%s reducer', () => {"%(file_name))
  lines.append("  it('initialState', () => {")
  lines.append("    expect(%sReducer(undefined, {})).toEqual(initialState);"%(file_name))
  lines.append("  });")
  lines.append("});\n")

  return '\n'.join(lines)

def process_store(lines):
  print process_store
  last_import_row = 0
  for i, line in enumerate(lines):
    if(line.startswith("import")):
      last_import_row = i
  lines.insert(last_import_row+1, "import { %sReducer } from '%s';\n"%(file_name, files_url['reducer']))
  for i, line in enumerate(lines):
    if("const combindedReducer" in line):
      target_i, target_j = find_bracket(lines, "{", "}", i, len(lines[i])-1)
      lines.insert(target_i, "    %s: %sReducer,\n"%(file_name_nc, file_name))
  return ''.join(lines)

#directory generator
if not os.path.exists(dir_path):
    os.makedirs(dir_path)

print(targets)
#templateFile generator
if 'j' in targets or '*' in targets:
  file_w = open(files_path['js'], 'w')
  file_w.write(container_js_template())
  file_w.close()
if 's' in targets or '*' in targets:
  file_w = open(files_path['scss'], 'w')
  file_w.write(container_scss_template())
  file_w.close()
if 't' in targets or '*' in targets:
  file_w = open(files_path['thunk'], 'w')
  file_w.write(container_thunk_template())
  file_w.close()
if 'a' in targets or '*' in targets:
  file_w = open(files_path['action'], 'w')
  file_w.write(action_template())
  file_w.close()
if 'r' in targets or '*' in targets:
  file_w = open(files_path['reducer'], 'w')
  file_w.write(reducer_template())
  file_w.close()
  #write reduce.test.js
  file_w = open(files_path['reducer_test'], 'w')
  file_w.write(reducer_test_template())
  file_w.close()
  #write to store/index.js
  file_r = open('src/store.js', 'r')
  file_r_lines = file_r.readlines()
  file_r.close()
  file_w = open('src/store.js', 'w')
  file_w.write(process_store(file_r_lines))
  file_w.close()

print(file_name)

