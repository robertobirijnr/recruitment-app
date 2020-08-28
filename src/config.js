export default {
  apiUrl: 'https://moon-recruit.herokuapp.com/api',


  set_token(token) {
    localStorage.setItem('token', token);
  },

  get_token() {
    return localStorage.getItem('token');
  },

  set_auth(auth) {
    localStorage.setItem('auth', auth);
  },

  set_user(user) {
    localStorage.setItem('user', user);
  },

  get_auth() {
    return localStorage.getItem('auth');
  },
  get_user() {
    return localStorage.getItem('user');
  },
  app: {
    sidebarTransitionTime: 300, //ms
    colors: {
      sidebar: "#002B49",
      navbar: "#ffffff",
      primary: "#005792",
      secondary: "#798892",
      success: "#21AE8C",
      info: "#1A86D0",
      warning: "#FDA700",
      danger: "#FD5F00",
      inverse: "#002B49",
      textColor: "#495057",
      gray: "#D7DFE6"
    },
    chartColors: {
      axisColor: '#8EA1AB'
    }
  }
};