<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container">

		<input id="name" />
		<input id="email" />

		<div id="message"></div>

		<img id="img" src="" alt="" />
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script type="module">
  import { faker } from '<?= site_url('js/fakerjs/index.js') ?>';

  // Caitlyn Kerluke
  const randomName = faker.person.fullName();

  // Rusty@arne.info
  const randomEmail = faker.internet.email();

  const message = faker.company.name()  // VsvwSdm_Am // 57

  document.getElementById('name').value = randomName;
  document.getElementById('email').value = randomEmail;
  document.getElementById('message').innerHTML = message;
  document.getElementById('img').setAttribute('src', faker.image.urlLoremFlickr({ width: 600, height: 400 }));
</script>

<?= $this->endSection() ?>