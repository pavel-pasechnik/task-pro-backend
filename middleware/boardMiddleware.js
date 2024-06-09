import Card from '../models/card.js';
import Column from '../models/column.js';

export const cascadeDeleteColumnsAndCards = async (req, res, next) => {
  const { id: boardId } = req.params;

  const columns = await Column.find({ owner: boardId });
  const columnIds = columns.map(column => column._id);

  await Card.deleteMany({ owner: { $in: columnIds } });
  await Column.deleteMany({ owner: boardId });

  next();
};

export const cascadeDeleteCards = async (req, res, next) => {
  const { id: columnId } = req.params;

  await Card.deleteMany({ owner: columnId });

  next();
};
