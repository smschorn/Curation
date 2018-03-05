module.exports = {
  show200(req, res) {
    res.sendStatus(200);
  },
  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },

  // collections
  showAllCollections(req, res) {
    res.render('collections/index', {
      collection: res.locals.collection
    });
  },
  createCollection(req, res) {
    res.redirect(`/collections/${res.locals.collection.id}/edit`);
  },
  editCollection(req, res) {
    res.render('collections/edit', {
      collection: res.locals.collection,
    });
  },
  showCollection(req, res) {
    res.render('collections/show', {
      collection: res.locals.collection,
      artworks: res.locals.artworks
    });
  },
  updateCollection(req, res) {
    res.redirect(`/collection/${req.params.id}`);
  }
};
