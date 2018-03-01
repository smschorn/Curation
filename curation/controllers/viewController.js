module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  showQuotes(req, res) {
    res.render('quotes/quote-index', {
      data: res.locals.quotes,
    });
  },
  showOne(req, res) {
    res.render('quotes/quote-single', {
      data: res.locals.quote,
    });
  },
  showAddForm(req, res) {
    res.render('quotes/quote-add');
  },
  showEditForm(req, res) {
    res.render('quotes/quote-edit', {
      data: res.locals.quote,
    });
  },
  handleCreate(req, res) {
    res.redirect('/quotes');
  },
  handleUpdate(req, res) {
    res.redirect(`/quotes/${req.params.id}`);
  },
  handleDelete(req, res) {
    res.redirect('/quotes');
  },
};
