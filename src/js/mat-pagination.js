/*!
    *
    * Date: 2018-03-02
    */

(function (global) {
    var 

        Pagination = {

        code: '',
        // converting initialize data
        Extend: function (data) {
            data = data || {};
            Pagination.size = data.size || 300;
            Pagination.page = data.page || 1;
            Pagination.step = data.step || 3;
        },
        // add pages by number (from [s] to [f])
        Add: function (s, f) {
            for (var i = s; i < f; i++) {
                Pagination.code += '<a class="page-link" href="page=' + i + '">' + i + '</a>';
            }
        },
        // add last page with separator
        Last: function () {
            Pagination.code += '<i>...</i><a class="page-link" href="page=' + Pagination.size + '">' + Pagination.size + '</a>';
        },
        // add first page with separator
        First: function () {
            Pagination.code += '<a class="page-link" href="page=1">1</a><i>...</i>';
        },
        // change page
        Click: function () {
            Pagination.page = +this.innerHTML;
            Pagination.Start();
        },
        // previous page
        Prev: function () {
            Pagination.page--;
            if (Pagination.page < 1) {
                Pagination.page = 1;
            }
            Pagination.Start();
        },
        // next page
        Next: function () {
            Pagination.page++;
            if (Pagination.page > Pagination.size) {
                Pagination.page = Pagination.size;
            }
            Pagination.Start();
        },
        // binding pages
        Bind: function () {
            var a = Pagination.e.getElementsByTagName('a');
            for (var i = 0; i < a.length; i++) {
                if (+a[i].innerHTML === Pagination.page) a[i].classList.add('current');
                // a[i].addEventListener('click', Pagination.Click, true);
            }
        },
        // write pagination
        Finish: function () {
            Pagination.e.innerHTML = Pagination.code;
            Pagination.code = '';
            Pagination.Bind();
        },
        // find pagination type
        Start: function () {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            }
            else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            }
            else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            }
            else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
            Pagination.Finish();
        },
        // create skeleton
        Create: function (e) {

            var html = [
                '<a class="page-link" href="page=1">&laquo;</a>', // previous button
                '<span></span>',  // pagination container
                '<a class="page-link" href="page=' + Pagination.size + '">&raquo;</a>'  // next button
            ];

            e.innerHTML = html.join('');
            Pagination.e = e.getElementsByTagName('span')[0];
            // Pagination.Buttons(e);
        },
        // init
        Init: function (e, data) {
            Pagination.Extend(data);
            Pagination.Create(e);
            Pagination.Start();
        }
    }

    global.mattelSite.pagination = Pagination;
}(typeof window !== "undefined" ? window : this));