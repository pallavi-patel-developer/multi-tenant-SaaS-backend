import jwt from "jsonwebtoken";

const tenantAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:: ", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: Authentication token is missing" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN : ", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED : ", decoded);

    // Ensure that this token is indeed a tenant token
    if (!decoded.tenantId) {
      return res.status(403).json({ success: false, message: "Forbidden: Invalid authorization token (not a tenant)" });
    }

    req.user = decoded;
    console.log("REQ USER : ", req.user);
    next();
  } catch (error) {
    console.log("ERROR : ", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token", error: error.message });
  }
};

export { tenantAuthMiddleware };
