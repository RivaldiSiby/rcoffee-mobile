export const onDelete = isdelete => {
  return {
    type: 'ON_DELETE',
    delete: isdelete,
  };
};
