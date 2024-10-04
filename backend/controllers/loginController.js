const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  try {
    const cookie = req.cookies;
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required!" });
    }
    const foundUser = await prisma.user.findUnique({ where: { email }, 
      include: { role: true },  // Include the role relation 
      });
    if (!foundUser) return res.sendStatus(401); //unAuthorized
    //evaluate password
    const match = await bcrypt.compare(password, foundUser?.password);
    if (!match) return res.sendStatus(401);
    if (!foundUser.active) return res.sendStatus(403); //forbiden
      // create JWTs
      const accessToken = jwt.sign(
        { userInfo: { fullName: foundUser.fullName, email, role: foundUser.role } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const newRefreshToken = jwt.sign(
        { userInfo: { fullName: foundUser.fullName, email, role: foundUser.role } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Saving refreshToken with current user
      let newRefreshTokenArray = !cookie.jwt
        ? foundUser.refreshToken
        : foundUser.refreshToken.filter((rt) => rt !== cookie.jwt);
      if (cookie?.jwt) {
        /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
                const refreshToken = cookie.jwt;
                const foundToken = await prisma.user.findFirst({ where: { email, refreshToken: { has: refreshToken} }});
    
                // Detected refresh token reuse!
                if (!foundToken) {
                    console.log('attempted refresh token reuse at login!')
                    // clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }
    
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }

      const result = await prisma.user.update({
        where: { fullName: foundUser.fullName, email },
        data: { refreshToken: [...newRefreshTokenArray, newRefreshToken] },
      });
      console.log(result);

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true, // comment this when using thunderclient to test refreshToken otherwise cookie will not be set on req.cookies
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ success: `Success, Logged in as ${result.fullName}!`, id: result.id ,email, fullName: result.fullName, role: foundUser.role, accessToken });
    
  } catch (err) {
    console.log({err})
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogin };
