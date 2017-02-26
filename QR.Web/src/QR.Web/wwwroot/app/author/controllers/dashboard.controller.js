﻿(function () {
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
    .controller('DashboardController', ['$timeout', 'SharedService','$scope', function ($timeout, SharedService, $scope) {
        var self = this;
        self.timeout = $timeout;
        self.shared = SharedService;
        self.shared.currentContext = 'Dashboard';
        self.shared.actions = [
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--Delete', click: 'deletePost', disabled: true, show : false, title : 'Delete Post' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--Blocked2', click: 'suspendPost', show : false, title : 'Suspend Post'  },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--PeopleBlock', click: 'deleteAuthor', disabled: true, show : false, title : 'Delete Author' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--PeoplePause', click: 'suspendAuthor', show : false, title : 'Suspend Author'  },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--PageAdd', click: 'addNewPost',show : true, title: 'New Post' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--SyncFolder', click: 'syncPosts', show : true, title : 'Sync Posts' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--AddFriend', click: 'addNewAuthor',show : true, title: 'Invite Author' },
            { id: _.uniqueId('_POST_ACTION'), iconName: 'ms-Icon--PeopleRepeat', click: 'syncAuthors', show : true, title : 'Sync Authors' },
        ];
        self.selectedAuthors  = [];
        self.selectedPosts = [];
        self.samplingForPosts = function (iter) {
            var _samples = [];
            self.sampleRowClasses = {};
            for (var i = 0; i < iter; i++) {
                var _post = new SamplePost();
                _samples.push(_post);
            }
            return _samples;
        }
        self.processForPostRelatedActions = function()
        {
                //Save
                //Delete
                //Suspend
             _.each(self.shared.actions, function(_action){
                if(_action.click  == 'savePost' || _action.click  == 'deletePost' || _action.click  == 'suspendPost')
                {
                    _action.show = self.selectedPosts.length > 0; 
                }
                else if(_action.click  == 'saveAuthor' || _action.click  == 'deleteAuthor' || _action.click  == 'suspendAuthor')
                {
                    _action.show = false; 
                }
            });
            $scope.$apply();
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
            hybridCellDefn: hybridCellDefnForPosts,
            rowSelectionCallback: function (data) {
                if(data.value == true)
                {
                    if(_.contains(self.selectedPosts, data.key) == false){
                        self.selectedPosts.push(data.key);
                    }
                }
                else
                {
                    self.selectedPosts = _.filter(self.selectedPosts, function(_pid){ return _pid != data.key})
                }
                self.processForPostRelatedActions()
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
                { id: 'edit', columnName: '', ddSort: false, ddGroup: false, ddFilters: false, dropDownEnabled: false, width: '60', renderHybridCellDefn : true },
                { id: 'publish', columnName: 'Publish', ddSort: false, ddGroup: false, ddFilters: false, dropDownEnabled: false, width: '60', renderHybridCellDefn : true },
                { id: 'name', columnName: 'Name', ddSort: true, ddGroup: false, ddFilters: false, dropDownEnabled: true, width: '300', renderHybridCellDefn: true },
                { id: 'category', columnName: 'Category', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, width: '150' },
                { id: 'author', columnName: 'Author', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, hidden: false, width: '150' },
                { id: 'contentType', columnName: 'Type', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, renderHybridCellDefn: false, width: '150' },
                { id: 'createdDate', columnName: 'Created On', columnIsDate: true, columnDatePipe: 'dd-MM-yyyy', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, ddFiltersWithSearch: true, width: '150' },
                { id: 'published', columnName: 'Is Published', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, headTabIndex: -1, renderHybridCellDefn: true, width: '200' },
                { id: 'suspended', columnName: 'Is Suspended', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, renderHybridCellDefn: true, width: '200' }
            ]
        };

        function hybridCellDefnForPosts(row, col) {
            var tmpl = '<span>VX_DATA_POINT</span>';
            if (col.id == 'name')
                tmpl = '<a class="vx-grid-a" href="#/post" title="' + row[col.id] + '">' + row[col.id] + '</a>';
            else if (col.id == 'category')
                tmpl = tmpl.replace('VX_DATA_POINT', row[col.id].name || '');
            else if (col.id == 'published') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck green"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            else if (col.id == 'suspended') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck red"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            else if(col.id == 'edit'){
                tmpl = '<div class="icon-container vx-grid-action" title="Edit Post"><i tabindex="0" class="ms-Icon ms-Icon--EditNote" uid="' + row.id  + '" data-tag="edit-post" ></i></div>';
            }
            else if(col.id == 'publish'){
                tmpl = row['published'] == false ? '<div class="icon-container vx-grid-action publish" title="Publish Post"><i tabindex="0" class="ms-Icon ms-Icon--CloudUpload" uid="' + row.id  + '" data-tag="publish-post" ></i></div>' : '';
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
        self.processForAuthorRelatedActions = function()
        {
            //Save
            //Delete
            //Suspend
            _.each(self.shared.actions, function(_action){
                if(_action.click  == 'savePost' || _action.click  == 'deletePost' || _action.click  == 'suspendPost')
                {
                    _action.show = false; 
                }                    
                else if(_action.click  == 'saveAuthor' || _action.click  == 'deleteAuthor' || _action.click  == 'suspendAuthor')
                {
                    _action.show = self.selectedAuthors.length > 0; 
                }
            });
            $scope.$apply();
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
            hybridCellDefn: hybridCellDefnForAuthors,
            rowSelectionCallback: function (data) {
                if(data.value == true)
                {
                    if(_.contains(self.selectedAuthors, data.key) == false){
                        self.selectedAuthors.push(data.key);
                    }
                }
                else
                {
                    self.selectedAuthors = _.filter(self.selectedAuthors, function(_pid){ return _pid != data.key})
                }
                self.processForAuthorRelatedActions();
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
                { id: 'edit', columnName: '', ddSort: false, ddGroup: false, ddFilters: false, dropDownEnabled: false, width: '60', renderHybridCellDefn : true },
                { id: 'authorPic', columnName: '', ddSort: false, ddGroup: false, ddFilters: false, dropDownEnabled: false, width: '60', renderHybridCellDefn : true },
                { id: 'name', columnName: 'Name', ddSort: true, ddGroup: false, ddFilters: false, dropDownEnabled: true, width: '300' },
                { id: 'authenticationType', columnName: 'Auth', ddSort: true, ddGroup: false, ddFilters: true, ddFiltersWithSearch: true, dropDownEnabled: true, width: '150' },
                { id: 'authenticationUID', columnName: 'AuthID', ddSort: true, ddGroup: false, ddFilters: false, dropDownEnabled: true, hidden: false, width: '150' },
                { id: 'alias', columnName: 'Alias', ddSort: true, ddGroup: false, ddFilters: false, ddFiltersWithSearch: true, dropDownEnabled: true, renderHybridCellDefn: false, width: '150' },
                { id: 'activatedOn', columnName: 'Activated On', columnIsDate: true, columnDatePipe: 'dd-MM-yyyy', ddSort: true, ddGroup: false, ddFilters: true, dropDownEnabled: true, ddFiltersWithSearch: true, width: '150' },
                { id: 'suspended', columnName: 'Is Suspended', ddSort: true, ddGroup: false, ddFilters: false, hidden: false, renderHybridCellDefn: true, width: '200' }
            ]
        };

        function hybridCellDefnForAuthors(row, col) {
            var tmpl = '<span>VX_DATA_POINT</span>';
            if (col.id == 'category')
                tmpl = tmpl.replace('VX_DATA_POINT', row[col.id].name || '');
            else if (col.id == 'published') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck green"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            else if (col.id == 'suspended') {
                tmpl = row[col.id] == true ? '<p class="vx-grid-p"><i class="ms-Icon ms-Icon--SkypeCircleCheck red"></i></p>' : '<p class="vx-grid-p"><span>-</span></p>'
            }
            else if(col.id == 'edit'){
                tmpl = '<div class="icon-container vx-grid-action" title="Edit Author"><i class="ms-Icon ms-Icon--Edit" tabindex="0" uid="' + row.id  + '" data-tag="edit-author" ></i></div>';
            }
            else if(col.id == 'authorPic'){
                tmpl = '<div class="vx-grid-picture" title="' + row['name'] + '"><i class="ms-Icon ms-Icon--Contact" ></i></div>';
            }
            return tmpl;
        }

        document.addEventListener('click', function(e){
            if (e.target.matches('[data-tag="edit-post"]')) 
            {
                var _postId = e.target.getAttribute('uid');
                var _path = location.origin + '/Author/#post';
                window.open(_path, '_self');
            }
            else if (e.target.matches('[data-tag="publish-post"]')) 
            {
                var _postId = e.target.getAttribute('uid');
                var _path = location.origin + '/Home/Index';
                window.open(_path, '_self');
            }
            else if (e.target.matches('[data-tag="edit-author"]')) 
            {
                var _postId = e.target.getAttribute('uid');
                var _path = location.origin + '/Author/#post';
                window.open(_path, '_self');
            }
        })

    }]);
})();