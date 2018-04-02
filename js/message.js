!function () {
    var view = document.querySelector('section.message')
    var model = {
        init: function () {
            var APP_ID = 'js4Hnia8mb2Oa3489TTB1mUm-gzGzoHsz'
            var APP_KEY = 'WHbkxJwNQzWIwNDYBLt1XoL9'
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function () {
            var query = new AV.Query('Message')
            return query.find() // Promise 对象
        },
        save: function (name, content) {
            let Message = AV.Object.extend('Message');
            let message = new Message();
            return message.save({
                name: name,
                content: content
            })
        }
    }

    var controller = {
        view: null,
        model:null,
        messageList: null,
        postMessageForm: null,
        init: function (view,model) {
            this.view = view
            this.model = model
            this.model.init()
            this.messageList = view.querySelector('#messageList')
            this.postMessageForm = view.querySelector('form')
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function () {
            this.model.fetch()
                .then((messages) => {
                    let arr = messages.map((item) => item.attributes)
                    arr.forEach(item => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name} : ${item.content}`//attributes里有content属性
                        this.messageList.appendChild(li)
                    })
                })

        },
        bindEvents: function () {
            var saveThis = this
            this.postMessageForm.addEventListener('submit', function (ev) {
                ev.preventDefault()//阻止默认刷新页面
                saveThis.saveMessage()
            })
        },
        saveMessage: function () {
            let postMessageForm = this.postMessageForm
            let content = postMessageForm.querySelector('textarea[name=content]').value
            let name = postMessageForm.querySelector('input[name=name]').value
            if( name === ''||content ===''){
                alert('输入名字和内容')
            }else{
                this.model.save(name, content)
                    .then(function (object) {
                        let li = document.createElement('li')
                        li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                        let messageList = document.getElementById('messageList')
                        messageList.appendChild(li)
                        postMessageForm.querySelector('textarea[name=content]').value = ''//清空内容
                        postMessageForm.querySelector('input[name=name]').value = ''
                    })
            }

        }

    }
    controller.init(view,model)
}.call()





