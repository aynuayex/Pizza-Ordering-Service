const { ForbiddenError, createMongoAbility } = require('@casl/ability');

// Middleware to check permissions using CASL
const checkPermissions = (action, resource) => {
  return (req, res, next) => {
    const user = req.user; 

    // Create CASL Ability for the user
    const ability = createMongoAbility(JSON.parse(user.role.permissions)); // Use role permissions

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, resource);
      next(); 
    } catch (error) {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = checkPermissions;