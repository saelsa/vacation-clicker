$(function () {

    //Data array, the "model" of this MVC app
    const data = {
        destinationArray: [
            {
                id: 1,
                name: 'Beach',
                image: 'img/beach.jpeg',
                clicks: 0,
                selected: false
    },
            {
                id: 2,
                name: 'City',
                image: 'img/city.jpeg',
                clicks: 0,
                selected: false
        },
            {
                id: 3,
                name: 'Desert',
                image: 'img/desert.jpeg',
                clicks: 0,
                selected: false
        },
            {
                id: 4,
                name: 'Mountains',
                image: 'img/mountains.jpeg',
                clicks: 0,
                selected: false
        },
            {
                id: 5,
                name: 'Space',
                image: 'img/space.jpeg',
                clicks: 0,
                selected: false
        }
    ]
    }

    //Controller of this MVC app
    const controller = {

        //initializing the app by setting getting a destination from the model and setting the view
        init: function () {
            controller.setSelectedDestination();
            viewList.init();
            viewDestination.init();
            viewAdmin.init();

        },

        //get all destination from the array
        getAllDestinations: function () {
            return data.destinationArray;
        },

        //get the selected destination by filtering the data array for the entry
        //where selected is true
        getSelectedDestination: function () {
            let selectedDestination = data.destinationArray.find(function (destination) {
                return destination.selected;
            });

            return selectedDestination;
        },

        //default when initializing the app, simply the first entry in the data
        //array is set as selectedDestination by changing the selected attribute to true
        setSelectedDestination: function () {
            data.destinationArray[0].selected = true;
        },

        //change the selected destination by first setting all 'selected'
        //properties to false, and then setting the chosen destination to true
        //afterwards rendering the relevant views
        changeSelectedDestination: function (destination) {
            data.destinationArray.forEach(function (destinations) {
                destinations.selected = false;
            });

            data.destinationArray[destination.id - 1].selected = true;

            viewDestination.render();
            viewAdmin.render();

        },

        //updating the data values click property, afterwards rendering
        //the relevant views
        countClicks: function (destination) {
            data.destinationArray[destination.id - 1].clicks += 1;

            viewDestination.render();
            viewAdmin.render();
        },

        //passing changes to the data array, afterwards rendering the
        //relevant views
        addChanges: function (destination, name, url, clicks) {
            data.destinationArray[destination.id - 1].name = name;
            data.destinationArray[destination.id - 1].image = url;
            data.destinationArray[destination.id - 1].clicks = clicks;

            viewList.render();
            viewDestination.render();


        }

    }

    //The "view" part of this MVC app is separated in several parts, since
    //they do not all need to be updated by the same events
    const viewList = {

        //setting the DOM variables for later use
        //setting an event listener for clicking on the destination list
        //rendering the list view
        init: function () {

            this.$destinationList = $('.destination-list');

            this.$destinationList.on('click', '.destination', function (e) {
                let destination = $(this).data();
                controller.changeSelectedDestination(destination);

                return false;
            })

            this.render();
        },

        //getting all destinations from the controller and adding them to the DOM
        render: function () {
            let $destinationList = this.$destinationList;

            $destinationList.html('');
            controller.getAllDestinations().forEach(function (destination) {
                $destinationList.append(`<li class="destination list-group-item" data-id="${destination.id}"><a href="#">${destination.name}</a></li>`);
            })
        }
    }

    const viewDestination = {

        //setting the DOM variables for later use
        //setting an event listener for clicking on the image
        //rendering the destination view
        init: function () {
            this.$destinationArea = $('.destination-container');

            this.$destinationArea.on('click', 'img', function (e) {
                let destination = $(this).data();
                controller.countClicks(destination);

                return false;
            })

            this.render();
        },

        //getting the selected destination from the controller and adding it to the DOM
        render: function () {
            let $destinationArea = this.$destinationArea;
            let selectedDestination = controller.getSelectedDestination();

            $destinationArea.html('');

            $destinationArea.append(`<div><h4>${selectedDestination.name} Score: ${selectedDestination.clicks}</h4><img class="img-fluid rounded img-thumbnail" src='${selectedDestination.image}' data-id="${selectedDestination.id}" alt="Picture of a ${selectedDestination.name}"'></div>`);

        }

    }

    const viewAdmin = {

        //setting the DOM variables for later use
        //setting an event listener for clicking on the admin form
        //setting an event listener for submitting the admin form
        //rendering the admin view
        init: function () {
            this.$adminButton = $('.admin-button');
            this.$adminForm = $('#admin-form');
            this.$inputName = $('#input-name');
            this.$inputURL = $('#input-url');
            this.$inputClicks = $('#input-clicks');

            this.$adminButton.click(function () {
                $('#admin-form').toggleClass("hide");
            });

            this.$adminForm.submit(function (e) {

                let selectedDestination = controller.getSelectedDestination();
                controller.addChanges(selectedDestination, $('#input-name').val(), $('#input-url').val(), $('#input-clicks').val());

                e.preventDefault();
            });


            this.render();

        },

        //getting the selected destination values to display in the admin form
        //from the controller and attaching them to the DOM
        render: function () {
            let $inputName = this.$inputName;
            let $inputURL = this.$inputURL;
            let $inputClicks = this.$inputClicks;
            let selectedDestination = controller.getSelectedDestination();

            $inputName.val(selectedDestination.name);
            $inputURL.val(selectedDestination.image);
            $inputClicks.val(selectedDestination.clicks);


        }

    }

    //on page load run the controllers initializing function
    controller.init();

});
