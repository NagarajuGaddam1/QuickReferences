(function () {
    "use strict";

    function SamplePost() {
        this.id = _.uniqueId('_ORIG_POST');
        this.name = 'Lorem ipsum dolor sit amet';
        this.category = _.sample(['html', 'css', 'js', 'scss', 'others']);
        this.author = _.sample(['Rupesh Rawat', 'Asit Parida', 'Dhairya Vora']);
        this.contentType = _.sample(['tl-dr', 'article']);
        this.createdDate = new Date();
        this.published = _.sample([true, false]);
        this.suspended = _.sample([true, false]);
    }

    function SampleAuthor() {
        this.id = _.uniqueId('_ORIG_AUTHOR');
        this.name = _.sample(['Rupesh Rawat', 'Asit Parida', 'Dhairya Vora']) + ' ' + _.sample(_.range(10));
        this.authenticationType = _.sample(['facebook', 'GitHub', 'LinkedIn']);
        this.authenticationUID = _.sample(['fb', 'git', 'lin']) + '_' + _.sample(_.range(10));
        this.alias = _.sample(['ruprawat', 'asparida', 'dhvora']);
        this.activatedOn = new Date();
        this.suspended = _.sample([true, false]);
    }

    angular.module('QR.Web.Author')
    .controller('DashboardController', ['$timeout', 'SharedService', function ($timeout, SharedService) {
        var self = this;
        self.timeout = $timeout;
        self.shared = SharedService;
        self.shared.currentContext = 'Dashboard';
        self.shared.actions = [];
        self.samplingForPosts = function (iter) {
            var _samples = [];
            self.sampleRowClasses = {};
            for (var i = 0; i < iter; i++) {
                var _post = new SamplePost();
                _samples.push(_post);
            }
            return _samples;
        }

        self.postsGridConfig = {
            enableDropdownsInHeader: true,
            ddSort: true,
            columnFilteringEnabled: true,
            groupedColumnHidingEnabled: false,
            selectionEnabled: true,
            selectionAtMyRisk: true,
            preserveSelectionOnFilters: true,
            allRowsSelectionEnabled: true,
            multiSelectionEnabled: true,
            multiSelectionDependentCol: null,
            onSelectionReturnCol: 'id',
            showGridStats: false,
            showGridOptions: false,
            latchExcess: 20,
            data: self.samplingForPosts(100),
            jsonEditorEnabled: false,
            vxFilteredData: [],
            hybrid: true,
            rowClassFn: randomRowFunction,
            hybridCellDefn: hybridCellDefn,
            rowSelectionCallback: function (data) {
                console.log('rowSelectionCallback', data);
            },
            virtualization: false,
            pagination: false,
            pageLength: 100000,
            sortPredicate: 'name',
            reverseSortDirection: false,
            emptyFill: 'No records in the grid',
            loaderGifSrc: '/dist/images/loaderBlue30.gif',
            columnDefConfigs: [
                { id: 'id', columnName: 'ID', hidden: true, ddSort: true, width: '160', primary: true },
                { id: 'name', columnName: 'Name', ddSort: true, ddGroup: false, ddFilters: false, dropDownEnabled: true, width: '300', renderHybridCellDefn: true },
                { id: 'category', columnName: 'Category', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, width: '150' },
                { id: 'author', columnName: 'Author', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, hidden: false, width: '150' },
                { id: 'contentType', columnName: 'Type', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, renderHybridCellDefn: false, width: '150' },
                { id: 'createdDate', columnName: 'Created On', columnIsDate: true, columnDatePipe: 'dd-MM-yyyy', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, ddFiltersWithSearch: true, width: '150' },
                { id: 'published', columnName: 'Is Published', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, headTabIndex: -1, renderHybridCellDefn: true, width: '200' },
                { id: 'suspended', columnName: 'Is Suspended', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, renderHybridCellDefn: true, width: '200' }
            ]
        };

        function hybridCellDefn(row, col) {
            var tmpl = '<span>VX_DATA_POINT</span>';
            if (col.id == 'name')
                tmpl = '<a class="vx-grid-a" href="#/post" title="' + row[col.id] + '">' + row[col.id] + '</a>';
            if (col.id == 'category')
                tmpl = tmpl.replace('VX_DATA_POINT', row[col.id].name || '');
            if (col.id == 'published') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck green"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            if (col.id == 'suspended') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck red"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            return tmpl;
        }

        function randomRowFunction(row) {
        }

        self.openManageColumns = function () {
            self.postsGridConfig.openManageColumns();
        }

        self.samplingForAuthors = function (iter) {
            var _samples = [];
            self.sampleRowClasses = {};
            for (var i = 0; i < iter; i++) {
                var _post = new SampleAuthor();
                _samples.push(_post);
            }
            return _samples;
        }

        self.authorsGridConfig = {
            enableDropdownsInHeader: true,
            ddSort: true,
            columnFilteringEnabled: true,
            groupedColumnHidingEnabled: false,
            selectionEnabled: true,
            selectionAtMyRisk: true,
            preserveSelectionOnFilters: true,
            allRowsSelectionEnabled: true,
            multiSelectionEnabled: true,
            multiSelectionDependentCol: null,
            onSelectionReturnCol: 'id',
            showGridStats: false,
            showGridOptions: false,
            latchExcess: 20,
            data: self.samplingForAuthors(100),
            jsonEditorEnabled: false,
            vxFilteredData: [],
            hybrid: true,
            rowClassFn: randomRowFunction,
            hybridCellDefn: hybridCellDefn,
            rowSelectionCallback: function (data) {
                console.log('rowSelectionCallback', data);
            },
            virtualization: false,
            pagination: false,
            pageLength: 100000,
            sortPredicate: 'name',
            reverseSortDirection: false,
            emptyFill: 'No records in the grid',
            loaderGifSrc: '/dist/images/loaderBlue30.gif',
            columnDefConfigs: [
                { id: 'id', columnName: 'ID', hidden: true, ddSort: true, width: '160', primary: true },
                { id: 'name', columnName: 'Name', ddSort: true, ddGroup: false, ddFilters: false, dropDownEnabled: true, width: '300' },
                { id: 'authenticationType', columnName: 'Auth', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, width: '150' },
                { id: 'authenticationUID', columnName: 'AuthID', ddSort: true, ddGroup: false, ddFilters: false, dropDownEnabled: true, hidden: false, width: '150' },
                { id: 'alias', columnName: 'Alias', ddSort: true, ddGroup: false, ddFilters: false, ddFiltersWithSearch: true, dropDownEnabled: true, renderHybridCellDefn: false, width: '150' },
                { id: 'activatedOn', columnName: 'Activated On', columnIsDate: true, columnDatePipe: 'dd-MM-yyyy', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, ddFiltersWithSearch: true, width: '150' },
                { id: 'suspended', columnName: 'Is Suspended', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, renderHybridCellDefn: true, width: '200' }
            ]
        };

    }]);
})();