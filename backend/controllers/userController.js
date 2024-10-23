const prisma = require("../config/prisma");

const handleGetAllUsers = async (req, res) => {
  try {
    // Extract query parameters
    const {
      start = 0,
      size = 10,
      filters = "[]",
      globalFilter = "",
      sorting = "[]",
    } = req.query;

    // Parse filters and sorting (they are passed as JSON strings)
    const parsedFilters = JSON.parse(filters);
    const parsedSorting = JSON.parse(sorting);

    // Build where clause for filtering
    const where = {
      AND: [
        globalFilter
          ? {
              OR: [
                { name: { contains: globalFilter, mode: "insensitive" } }, // Example: global filter on role name
              ],
            }
          : {}, // No global filter if empty
        ...parsedFilters.map((filter) => ({
          [filter.id]: { contains: filter.value, mode: "insensitive" }, // Example filter for string fields
        })),
      ],
    };

    // Build orderBy clause for sorting
    const orderBy = parsedSorting.length
      ? parsedSorting.map((sort) => ({ [sort.id]: sort.desc ? "desc" : "asc" }))
      : [{ createdAt: "asc" }]; // Default sorting if none is provided

    // Fetch data from Prisma
    const users = await prisma.user.findMany({
      skip: parseInt(start, 10), // for pagination
      take: parseInt(size, 10), // for pagination
      where, // filtering
      orderBy, // sorting
    });

    // Fetch total row count for pagination purposes
    const totalRowCount = await prisma.user.count({
      where,
    });

    // Return the data and the meta information
    res.status(200).json({
      data: users,
      meta: {
        totalRowCount,
      },
    });
  } catch (err) {
    console.log({err});
    res.status(500).json({ message: err.message });
  }
};

const handleUserActiveStatus = async (req, res) => {
  try {
    console.log(req.body);
    const { id, isChecked } = req.body;
    const updatedUser = await prisma.user.update({where: {id}, data: {active: isChecked}});
    console.log({updatedUser});
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
const handleUserRoleChange = async (req, res) => {
  try {
    console.log(req.body);
    const { roleId, email } = req.body;
    const updatedUser = await prisma.user.update({where: {email}, data: {roleId}, include: {role: true}});
    console.log({updatedUser});
    res.status(200).json({success: `User ${updatedUser.fullName} updated to role ${updatedUser.role.name} successfully!`});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

const handleUserDelete = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const updatedUser = await prisma.user.delete({where: {id}});
    console.log({updatedUser});
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}



const handleGetAllOwners = async (req, res) => {
  try {
    const allOwners = await prisma.user.findMany({
      where: { role: "OWNER" },
      include: { _count: { select: { books: true } } },
    });
    const allOwnersWithBookCounts = allOwners.map((owner) => ({
      ...owner,
      _count: owner._count.books,
    }));
    console.log(allOwnersWithBookCounts);
    res.status(200).json({ allOwners: allOwnersWithBookCounts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleOwnerUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    console.log(req.params);
    console.log(req.body);
    const owner = await prisma.user.update({
      where: { id },
      data: { approved },
    });
    console.log(owner);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleOwnerDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const owner = await prisma.user.delete({ where: { id } });
    console.log(owner);
    next();
    // res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleGetAllUsers,
  handleUserRoleChange,
  handleUserActiveStatus,
  handleUserDelete,


  handleGetAllOwners,
  handleOwnerUpdate,
  handleOwnerDelete,
};
