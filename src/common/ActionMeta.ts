export type ActionMeta<MetaType = ActionMetaDefault> = {
  [KeyType in keyof MetaType]?: MetaType[KeyType];
};

export type ActionMetaDefault = {
  [KeyType in string | number]?: string | number | boolean | ActionMetaDefault;
};
