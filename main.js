class Parallax {
    constructor(obj){
        this.clouds = document.querySelectorAll(obj.clouds)
        this.boat   = document.querySelector(obj.boat)
        this.bg   = document.querySelector(obj.bg) 
        
        window.addEventListener('scroll', () => this.moveElements())
    } 
    moveElements(){
        this.clouds.forEach(cloud => {
            let speed = cloud.dataset.speed
            cloud.style.transform = `translateX(${window.scrollY * speed}px)`
        })
        this.boat.style.transform = `translateX(${window.scrollY * .8}px)`
        this.bg.style.objectPosition = `0 ${window.scrollY / 8}%`
    }
}

const parallax = new Parallax({
    clouds: '.header__cloud',
    boat: '.header__boat',
    bg: '.header__fantasy'
})

class TextAnimate {
    constructor(obj){
        this.text = document.querySelector(obj.text);
        this.fullText = this.text.innerHTML
        this.text.innerHTML = ''
        this.str()
    }
    str(x = 0){
        this.text.innerHTML += this.fullText[x]
        x++
        if(x < this.fullText.length){
            setTimeout(() => {
                this.str(x)
            }, 200);
        }
    }
}

const title = new TextAnimate({
    text: '.header__title'
})


class Scroll {
    constructor(obj){
        this.section = document.querySelector(obj.section);
        this.fadeType = this.section.querySelectorAll(obj.fadeType);
        window.addEventListener('scroll', () => {this.fadeAnim(this.section, this.fadeType)})
    }
    fadeAnim(section, fadeType){
        fadeType.forEach(card => {
            let speed = card.dataset.speed
            card.style.transition = speed + 'ms'
            if(window.scrollY >= (section.offsetTop - section.offsetHeight * 2)){
                card.classList.add('active')
            }else card.classList.remove('active')
        })
    }
}

const about = new Scroll({
    section: '.about',
    fadeType: '.fade-right',
})
const about2 = new Scroll({
    section: '.about2',
    fadeType: '.fade-left',
})
const scroll = new Scroll({
    section: '.scroll',
    fadeType: '.fade-right',
})


class ParallaxBalls {
    constructor(obj){
        this.balls = document.querySelectorAll(obj.balls);
        window.addEventListener('mousemove', (e) => { this.moveBalls(e) })
    }
    moveBalls(cursor){
        this.balls.forEach(ball => {
            const speed = ball.dataset.speed
            const X = (window.innerWidth - cursor.pageX * speed) / 100
            const Y = (window.innerWidth - cursor.pageY * speed) / 100
            
            ball.style.transform = `translate(${X}px, ${Y}px)`
        })
    }
}

const parallaxBalls = new ParallaxBalls({
    balls: '.parallax__ball'
})

class Timer {
    constructor(obj){
        this.timerNums = document.querySelectorAll(obj.timerNums)
        this.timerSection = document.querySelector(obj.timerSection)
        this.state = false
        
        window.addEventListener('scroll', () => { this.scrollTimer() })
    }
    scrollTimer(){
        if(!this.state){
            if(window.scrollY >= this.timerSection.offsetTop - this.timerSection.offsetHeight * 2){
                 this.state = true  
                 this.timerSet()      
            }
        }
    }
    timerSet(){
        this.timerNums.forEach(num => {
            const count = num.dataset.num
            num.innerHTML = 0
            function timer(i = 0) {
                num.innerHTML = i
                i++
                if(i <= count){
                    setTimeout(() => {
                        timer(i)
                    }, 5);
                }
            }
            timer()
        })
    }
}

const timer = new Timer({
    timerNums: '.timer__num',
    timerSection: '.timer'
})

class Button {
    constructor(obj){
        this.buttons = document.querySelectorAll(obj.buttons);
        
        this.buttons.forEach(btn => {
           btn.addEventListener('mousemove', (e) => {
             this.buttonShow(e, btn)
           })
        });
    }
    buttonShow(cursor, btn){
        const X = cursor.pageX - btn.offsetLeft
        const Y = cursor.pageY - btn.offsetTop
        
        let span = btn.children[0]
        
        span.style = `
            left: ${X}px;
            top: ${Y}px;
        `
        
    }
}

const button = new Button({
    buttons: '.timer__btn'
})


class Rotate3D{
    constructor({cards}){
        this.cards = document.querySelectorAll(cards)
        this.cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {this.rotate(e, card)})
            card.addEventListener("mouseout", (e) => {this.rotateNone( card)})
        })
    }
    rotate(cursor, card){
        const cardItem = card.children[0]
        const halfHeight = cardItem.offsetHeight / 2
        cardItem.style.transform = `rotateX(${(halfHeight - cursor.offsetY)/10}deg) rotateY(${-(halfHeight - cursor.offsetX)/10}deg)`
        
    }
    rotateNone(card){
        const cardItem = cardItem = card.children[0]
        cardItem.style.transform = "rotate(0)"
    }
}
const rotate3D = new Rotate3D({
    cards: '.card'

})