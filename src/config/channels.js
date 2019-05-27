// this file needs to use module.exports as it is used both by react and electron
// make sure this file is identical in both src/config and public/app/config

module.exports = {
  SAVE_SPACE_CHANNEL: 'space:save',
  GET_SPACE_CHANNEL: 'space:get',
  GET_SPACES_CHANNEL: 'spaces:get',
  DELETE_SPACE_CHANNEL: 'space:delete',
  DELETED_SPACE_CHANNEL: 'space:deleted',
  LOAD_SPACE_CHANNEL: 'space:load',
  LOADED_SPACE_CHANNEL: 'space:loaded',
  EXPORT_SPACE_CHANNEL: 'space:export',
  EXPORTED_SPACE_CHANNEL: 'space:exported',
  SHOW_LOAD_SPACE_PROMPT_CHANNEL: 'prompt:space:load:show',
  SHOW_EXPORT_SPACE_PROMPT_CHANNEL: 'prompt:space:export:show',
  SHOW_DELETE_SPACE_PROMPT_CHANNEL: 'prompt:space:delete:show',
  RESPOND_LOAD_SPACE_PROMPT_CHANNEL: 'prompt:space:load:response',
  RESPOND_EXPORT_SPACE_PROMPT_CHANNEL: 'prompt:space:export:respond',
  RESPOND_DELETE_SPACE_PROMPT_CHANNEL: 'prompt:space:delete:respond',
  GET_USER_FOLDER_CHANNEL: 'user:folder:get',
  GET_LANGUAGE_CHANNEL: 'user:lang:get',
  SET_LANGUAGE_CHANNEL: 'user:lang:set',
  GET_APP_INSTANCE_RESOURCES_CHANNEL: 'app-instance-resources:get',
  POST_APP_INSTANCE_RESOURCE_CHANNEL: 'app-instance-resource:post',
  PATCH_APP_INSTANCE_RESOURCE_CHANNEL: 'app-instance-resource:patch',
  DELETE_APP_INSTANCE_RESOURCE_CHANNEL: 'app-instance-resource:delete',
  GET_APP_INSTANCE_CHANNEL: 'app-instance:get',
  PATCH_APP_INSTANCE_CHANNEL: 'app-instance:patch',
};
