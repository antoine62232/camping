import jwt from 'jsonwebtoken';

export const authenticateEmployee = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: "Token d'accès requis" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = decoded; // { idEmployee, roleId }
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token invalide ou expiré" });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.employee || !allowedRoles.includes(req.employee.roleId)) {
            return res.status(403).json({ 
                message: `Rôle requis: ${allowedRoles.join(', ')}` 
            });
        }
        next();
    };
};
