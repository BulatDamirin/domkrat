

$(document).ready(function() {
    function launchFullScreen(element) {
        if(element.requestFullScreen) {
          element.requestFullScreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        }
      }
    
    // launchFullScreen(document.documentElement)
    function inputMask() {
        $('.input-country').mask('+9?99')
        $('.input-phone').mask('(999) 999-99-99', {autoclear: false})
    }
    inputMask()

    var tablet = 1150,
        mobile = 720;
    
    if ($(window).width() > tablet) {
        $('.comparison-elem:first').css('height', $('.comparison-elem__body:first').outerHeight(true)).addClass('uncover-elem-active');
        $('.types-elem:first').css('height', $('.types-elem__body:first').outerHeight(true)).addClass('uncover-elem-active');
    }

    var csrfToken = $('[name=csrfmiddlewaretoken]').val();
    var static = $('#static').val();

    $('.new-elem').height($(window).height())


    function formSubmit() {
        $('form').on('submit', function(e) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            var data = formDataCollection(this);
            if (data) {
                $('[name=phone]', this).css('border', '1px solid #E5E5E5')
                FetchData(data, this);
            }
            else {
                $('[name=phone]', this).css('border', '1px solid #FA8072')
            }
        })
    }
    formSubmit()

    function formDataCollection(self) {
        var info = $('.form-info', self).val();
        var phoneCountry = ($('[name=phone-country]', self).val() || '+7');
        var phone = $('[name=phone]', self).val();
        var phoneWithoutSymbols =  phone.replace(/[_() -]/g, '');

        if ( (phoneWithoutSymbols.length === 10) && (phoneCountry.length >= 2 && phoneCountry.length <= 4) ){
            var data = {
                'name': $('[name=name]', self).val(),
                'phone': phoneCountry + ' ' + phone,
                'info': info,
            }
            return data;
        }
        return false
    }

    function FetchData(data, self) {
        fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(result) {
            if (result.error) {
                if (!result.validate_phone) {$('[name=phone]', self).css('border', '1px solid red')}
                if (!result.validate_name) {$('[name=name]', self).css('border', '1px solid red')}
            }
            else {
                
                $('[name=name]', self).val('')
                $('[name=phone]', self).val('')
                $('[name=country]', self).val('')
                var popup = [
                    {
                        html: $('#popup-container').html()
                    }
                ];
                var options = {
                    showHideOpacity: true,
                    bgOpacity: 0.8,         
                };
                popup = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, popup, options);
                popup.init();
            }
            
        })
    }

    function changeOfPriceContent(name) {
        height = $('.price-images').height();
        var places = $('.place-for-img');

        places.each(function(i, elem) {
            var id = i+1;
            var container = $(elem);
            container.attr('href', static+ 'main/img/5-price/for-popup/' +name+ '-' + id + '.jpg');

            var picture = $('picture', container);
            picture.html('<source srcset="' +static+ 'main/img/5-price/webp/' +name+ '-' + id + '.webp">'+
                '<img src="' +static+ 'main/img/5-price/' +name+ '-' + id + '.jpg" alt="'+i+'">');
        })

        $('.price-images').height(height)
    }

    var pswpElement = document.querySelectorAll('.pswp')[0];
    var popupForm = {
        close: function() {
            return false
        }
    };

    function openImage(parent, index) {
        var img = $('a', parent);
        var imgs = [];

        var sizeElem = parent.data('size').split('x');

        img.each(function(i, elem) {
            imgs.push({
                src: $(elem).attr('href'),
                w: sizeElem[0],
                h: sizeElem[1],
                msrc: $('img', $(elem)).attr('src'),
            })
        });
        var options = {
            index: index,
            captionAndToolbarHide: false,
            getThumbBoundsFn: function(index) {
                var thumbnail = $('img', img).get(index) // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            bgOpacity: 0.7
        }
        
        var image = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, imgs, options);
        image.init();
    }


    $('.navbar-messenger').click(function() {
        var mesWindow = $('.messenger-number');
        mesWindow.addClass('messenger-number-active');
        $('.messenger-number__close').click(function() {
            $('.messenger-number').removeClass('messenger-number-active');
        })
    });

    $('.button-click').click(function() {
        var info = $(this).data('info')
        $('#modal-button .form-info').val(info)
        var rect = this.getBoundingClientRect()
        var modalForm = [
            {
                html: $('#form-container').html()
            }
        ];
        var options = {
            showHideOpacity: true,
            bgOpacity: 0.8,
            closeOnVerticalDrag: false,
            closeOnScroll: false,
            isClickableElement: function(el) {
                return el.tagName === 'FORM';
            },           
            getThumbBoundsFn: function(index) {
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },         
        };
        popupForm = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, modalForm, options);
        popupForm.init();
        inputMask()
        formSubmit()
    })


    $('.images').click(function(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (e.target.localName === 'img') {
            openImage($(this), +e.target.alt)
        }
    })
    
    function uncoverElem(self, name) {
        var parent = $(self).parent();
        var body = $('.uncover-elem__body', parent);
        var height = body.outerHeight(true)
        if ($(window).width() <= tablet) {
            if (parent.hasClass('uncover-elem-active-mobile')) {
                parent.removeClass('uncover-elem-active-mobile').css('height', 50)
            } else {
                parent.addClass('uncover-elem-active-mobile')
                parent.css('height', height + $(self).outerHeight(true))
                
            }
        } else {
            $('.' + name + '-elem').removeClass('uncover-elem-active').css('height', 50);
            parent.addClass('uncover-elem-active')
            parent.css('height', height);
        }
    }

    $('.comparison-elem__title').click(function() {
        uncoverElem(this, 'comparison')  
    })
    $('.types-elem__title').click(function() {
        uncoverElem(this, 'types')    
    })

    $('.price-type').click(function(){
        if (!$(this).hasClass('price-type-active') ) {
            $('.price-type').removeClass('price-type-active');
            $(this).addClass('price-type-active');

            var name = $(this).data('href');
            changeOfPriceContent(name);
        }
    })

    var menu = {
        open: function(top) {
            var navbar = $('.navbar-menu')
            navbar.addClass('navbar-menu-active');
        },
        close: function() {
            var navbar = $('.navbar-menu')
            navbar.removeClass('navbar-menu-active');       
        }
    }
    
    $('.navbar-menu-burger').click(function(e) {
        var navbar = $('.navbar-menu')

        if (!navbar.hasClass('navbar-menu-active')) {        
            menu.open();
        }
        else {
            menu.close();
        }
        
    })
    function scrollToBlock(id) {
        var elemTop = document.querySelector(id).offsetTop;
        $('body, html').animate({scrollTop: elemTop - 43}, 1000);
    }
    $('.navbar-menu-list a').click(function(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        menu.close();   
        var elemId = $(this).attr('href');
        scrollToBlock(elemId);
    })

    $('.language-swich').click(function() {
        $(this).toggleClass('language-swich-active')
    })

    function mapsScroll() {
        if ($(window).scrollTop() > $('#reasons').offset().top) {
            $('body, html').unbind('scroll', mapsScroll);
            $('#maps').html('<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A2b185adce02f9f7fee4c345b441aab1216c45ab4bb99899f168f59483f1553ab&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>');
        }
    }
    $('body, html').bind('scroll', mapsScroll)
});



