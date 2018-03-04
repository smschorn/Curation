module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },


  // collections
  showAllCollections(req, res) {
    res.render('collections/index', {
      data: res.locals.quotes,
    });
  },
  createCollection(req, res) {
    res.redirect(`/collections/${res.locals.collection.id}/edit`);
  },
  editCollection(req, res) {
    res.render('collections/edit', {
      data: res.locals.quote,
    });
  },
  showCollection(req, res) {
    res.render('collections/show', {
      data: res.locals.quote,
    });
  },
  updateCollection(req, res) {
    res.redirect(`/collection/${req.params.id}`);
  },
  deleteCollection(req, res) {
    res.redirect('/collections');
  }
};
