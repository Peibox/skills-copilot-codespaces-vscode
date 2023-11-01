// Create a server-side route handler for /api/comments
router.get('/api/comments', async (req, res) => {
  // Find all comments
  try {
    const comments = await db.Comment.findAll({
      include: [db.User],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Path: comments/:id
// Create a server-side route handler for /api/comments/:id
router.get('/api/comments/:id', async (req, res) => {
  // Find one comment by its `id` value
  try {
    const comment = await db.Comment.findByPk(req.params.id, {
      include: [db.User],
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Path: comments
// Create a server-side route handler for /api/comments
router.post('/api/comments', withAuth, async (req, res) => {
  // Create a new comment
  try {
    const newComment = await db.Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Path: comments/:id
// Create a server-side route handler for /api/comments/:id
router.put('/api/comments/:id', withAuth, async (req, res) => {
  // Update a comment by its `id` value
  try {
    const comment = await db.Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Path: comments/:id
// Create a server-side route handler for /api/comments/:id
router.delete('/api/comments/:id', withAuth, async (req, res) => {
  // Delete a comment by its `id` value
  try {
    const comment = await db.Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;