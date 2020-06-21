const app = new Vue({
    el:'#app',
    data: function(){
        return {
            notes:[],
            Anotation: '',
            positionAtual: null
        }
    },
    methods:{
        remove(){
            for(let i = 0; i < this.notes.length; i++){
                console.log(this.notes[i],'dasdasdas')
                if(this.notes[i].content == ''){
                    this.notes.splice(i,1);
                }
            }         
            window.localStorage.setItem('notes',JSON.stringify(this.notes));
        },
        create(){
            this.Anotation = '';
            this.$refs.textarea.value = '';
            this.remove();
        },
        save: _.debounce(function(){
                let data = this.$refs.textarea.value;
                let notes = window.localStorage.getItem('notes') || '[]';
                notes = JSON.parse(notes);
                if(this.Anotation == ''){
                    //criando
                    notes.splice(0,0,{
                        content:data
                    })
                }else{
                    //atualizando
                    
                    notes[this.positionAtual] = {content:data};
                }
                this.notes = notes;
                if(this.Anotation == ''){
                    this.showAnotation(0);
                }
                window.localStorage.setItem('notes',JSON.stringify(this.notes));
                this.remove();
            },300)
        ,
        showAnotation(index){
            this.positionAtual = index;
            this.Anotation = this.notes[index].content;
            this.$refs.textarea.value = this.notes[index].content;
            this.remove();
        },
    },
    mounted: function(){
        let notes = window.localStorage.getItem('notes') || '[]';
        this.notes = JSON.parse(notes);
    }
});