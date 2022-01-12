const getProfilePic = (data) => {
  if (!data.user.avatar_revision) {
    return 'https://tetr.io/res/avatar.png'
  } else {
    return `https://tetr.io/user-content/avatars/${data.user._id}.jpg?rv=${data.user.avatar_revision}`;
  }
}

module.exports = getProfilePic;