console.log('Starting up');

var gProjs;


function initPage() {
    createProjs();
    renderMoadl()
    renderPortoflioItem();

}

function renderPortoflioItem() {
    var strHtmls = gProjs.map(function (proj) {
        return `
    <div class="col-md-4 col-sm-6 portfolio-item">
 <a class="portfolio-link" data-toggle="modal" href="#${proj.id}">
 <div class="portfolio-hover">
 <div class="portfolio-hover-content">
 <i class="fa fa-plus fa-3x"></i>
 </div>
 </div>
 <img class="img-fluid" src="img/portfolio/04-thumbnail.jpg">
 </a>
 <div class="portfolio-caption">
 <h4>${proj.name}</h4>
 <p class="text-muted">${proj.title}</p>
 </div>
</div>
    `
    });
    $('.my-projs').html(strHtmls.join(''));
}


function renderMoadl() {
    var strhtmlModal = gProjs.map(function (proj) {
        return `
    <div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.desc}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
                <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
                  dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
                  maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                <ul class="list-inline">
                  <li>${proj.publishedAt}</li>
                  <li><a href="projs/${proj.id}/index.html" target="_blank">Check Game</a></li>
                  <li>Category: Illustration</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `});
    $('.modals').html(strhtmlModal.join(''));
}


function createProj(name) {
    return {
        id: name,
        name: name,
        title: 'Welcome to my catbrary',
        desc: 'lorem ipsum lorem ipsum lorem ipsum',
        url: 'projs/BookShop',
        publishedAt: new Date(),
        labels: ['Tables', "keyboard events"],
    };
}

function createProjs() {
    gProjs = [
        createProj('BookShop'),
        createProj('MineSweeper'),
    ];
}


function sendMail() {
    var subject = $('#subject').val();
    var msg = $('#message').val();
    var mailTab = 'https://mail.google.com/mail/?view=cm&fs=1&to=tamara13ali@gmail.com&su=' + subject + '&body=' + msg;

    window.open(mailTab);
}
