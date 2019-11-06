export type ActionMeta<MetaType = {}> = {
  [KeyType in keyof MetaType]?: MetaType[KeyType];
};
