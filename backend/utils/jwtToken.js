const sendToken = async function (user, statuscode, res) {
  const token = await user.getJWTtoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  return res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

module.exports = sendToken;
