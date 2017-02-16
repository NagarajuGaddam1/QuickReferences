(function () {
    "use strict";

    angular.module('QR.Web.Author.Notify', [])
    .service("Notify", ["$uibModal", "$timeout", "$uibModalStack", NotifyModalService]);

    function NotifyModalService($uibModal, $timeout, $uibModalStack) {
        var self = this;
        self.modalInstanceOpened = false;
        self.notifyInProgress = false;
        self.modalInstance = null;
        self.notifyData = function (data) {
            self.notifyInProgress = true;
            self.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/wwwroot/app/templates/notify.modal.html',
                backdropClass: 'modal-bod-welcome-backdrop',
                windowClass: 'modal-bod-notify',
                controller: ['$uibModalInstance', 'notificationdata', '$uibModalStack', function ($uibModalInstance, notificationdata, $uibModalStack) {
                    var self = this;
                    self.timerChangeMsg = null;
                    $uibModalStack.dismissAll();
                    $uibModalInstance.changeMsg = function (incomingData) {
                        if (JSON.stringify(self.data) !== JSON.stringify(incomingData))
                            if (incomingData.dismissable == true) {
                                self.data.timer = incomingData.timer;
                                self.timerChangeMsg = $timeout(function () {
                                    self.timerChangeMsg();
                                    $uibModalInstance.dismiss();
                                }, self.data.timer);
                            }
                            self.timerChangeMsg = $timeout(function () {
                                self.data.message = incomingData.message;
                                self.data.info = incomingData.info;
                                self.data.success = incomingData.success;
                                self.data.failed = incomingData.failed;
                                self.data.inProgress = incomingData.inProgress;
                            }, 2000);
                    }
                    self.data = notificationdata;
                    self.data.message = self.data.message || '';
                    self.data.dismissable = self.data.dismissable || false;
                    self.data.timer = self.data.timer || 3000;
                    self.data.info = self.data.info || false;
                    self.data.success = self.data.success || false;
                    self.data.failed = self.data.failed || false;
                    self.data.inProgress = self.data.inProgress || false;

                    if (self.data.dismissable == true) {
                        self.data.timer = self.data.timer;
                        $timeout(function () {
                            self.timerChangeMsg();
                            $uibModalInstance.dismiss();
                        }, self.data.timer);
                    }
                }],
                controllerAs: 'notifyModal',
                keyboard: false,
                backdrop: 'static',
                resolve: {
                    notificationdata: function () {
                        return data;
                    }
                }
            });

            self.modalInstance.opened.then(function () {
                self.modalInstanceOpened = true;
            });

            self.modalInstance.result.then(function (selectedItem) {
                self.notifyInProgress = false;
                self.modalInstanceOpened = true;
            }, function () {
                self.notifyInProgress = false;
                self.modalInstanceOpened = true;
            });

        }

        self.notifyNewMsg = function (data) {
            if (self.notifyInProgress == true) {
                if (self.modalInstanceOpened == true) {
                    self.modalInstance.changeMsg(data);
                }
            }
            else if (self.notifyInProgress == false) {
                self.notifyData(data);
            }
        }

        self.dismissNotification = function () {
            $uibModalStack.dismissAll();
        }

        return {
            notify: self.notifyNewMsg,
            dismiss: self.dismissNotification
        }
    }

})();