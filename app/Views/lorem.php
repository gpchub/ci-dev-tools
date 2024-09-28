<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1>Lorem Ipsum Generator</h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container">
        <div class="grid-auto">
            <form x-data="serialize">
                <div class="form-group">
                    <label>Prefix</label>
                    <input type="text" x-model="text">
                </div>
                <div  class="form-group">
                    <label>Count</label>
                    <input type="text" x-model="count">
                </div>
                <div  class="form-group">
                    <label>Join</label>
                    <select x-model="join">
                        <option value="line">Line</option>
                        <option value="space">Space</option>
                        <option value=",">Comma</option>
                        <option value=", ">Comma with space</option>
                        <option value=";">Semicolon</option>
                        <option value="; ">Semicolon with space</option>
                        <option value="|">Pipe</option>
                        <option value=" | ">Pipe with space</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Result</label>
                    <my-code-block x-text="result"></my-code-block>
                </div>
                <div class="form-group">
                    <button @click.prevent="serialize">Serialize</button>
                </div>
            </form>

            <form x-data="random">
                <div  class="form-group">
                    <label>Count</label>
                    <input type="text" x-model="count">
                </div>
                <div  class="form-group">
                    <label>Join</label>
                    <select x-model="join">
                        <option value="line">Line</option>
                        <option value="space">Space</option>
                        <option value=",">Comma</option>
                        <option value=", ">Comma with space</option>
                        <option value=";">Semicolon</option>
                        <option value="; ">Semicolon with space</option>
                        <option value="|">Pipe</option>
                        <option value=" | ">Pipe with space</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Result</label>
                    <my-code-block x-text="result"></my-code-block>
                </div>
                <div class="form-group">
                    <button @click.prevent="random">Random</button>
                </div>
            </form>
        </div>


    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script {csp-script-nonce}>

    document.addEventListener('alpine:init', () => {
        Alpine.data('serialize', () => ({
            text: '',
            result: '',
            count: 5,
            join: 'line',

            serialize() {
                let num = parseInt(this.count);
                let arr = [ ...Array(num).keys() ].map( i => `${this.text}${(i + 1)}` );
                let join = this.join === 'line' ? '\n' : (this.join === 'space' ? ' ' : this.join);
                this.result = arr.join(join);
            }
        }))

        Alpine.data('random', () => ({
            result: '',
            count: 5,
            join: 'line',

            random() {
                const array = [
                    // General Interest
                    "News and Current Events",
                    "Lifestyle",
                    "Entertainment",
                    "Travel",
                    "Food and Cooking",

                    // Specific Interests
                    "Technology",
                    "Business and Finance",
                    "Science and Nature",
                    "Arts and Culture",
                    "History and Biography",
                    "Hobbies and Crafts",
                    "Sports",
                    "Health and Wellness",
                    "Parenting",

                    // Niche Interests
                    "Gaming",
                    "Anime and Manga",
                    "Cosplay",
                    "Sci-Fi and Fantasy",
                    "Horror",

                    // Additional Categories
                    "Fashion",
                    "Beauty",
                    "Fitness",
                    "Home Decor",
                    "Interior Design",
                    "Gardening",
                    "DIY",
                    "Photography",
                    "Writing",
                    "Music",
                    "Art",
                    "Literature",
                    "Poetry",
                    "Visual Arts",
                    "Design",
                    "Architecture",
                    "Psychology",
                    "Sociology",
                    "Philosophy",
                    "Religion",
                    "Spirituality",
                    "Politics",
                    "Economics",
                    "Education",
                    "Careers",
                    "Automotive",
                    "Pets",
                    "Outdoor Activities",
                    "Adventure",
                    "Luxury",
                    "Sustainable Living",
                    "Social Issues",
                ];
                let num = parseInt(this.count);
                let random = array.sort(() => .5 - Math.random()).slice(0, num);

                let join = this.join === 'line' ? '\n' : (this.join === 'space' ? ' ' : this.join);
                this.result = random.join(join);
            }
        }))
    })
</script>

<?= $this->endSection() ?>