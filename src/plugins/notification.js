function notifyConfig({ type, title, text }) {
  return {
    group: "notify",
    type,
    title,
    text
  };
}

function errorNotify(text) {
  return {
    group: "notify",
    type: "error",
    title: "Thất bại",
    text
  };
}

function successNotify(text) {
  return {
    group: "notify",
    type: "success",
    title: "Thành công",
    text
  };
}

export { notifyConfig, errorNotify, successNotify };
