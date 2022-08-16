export default function (next, store) {
  if (!store.state.activeUser) {
    next("/403");
  } else {
    next();
  }
}
