document.addEventListener("DOMContentLoaded", function () {
    function scrollToSection(event) {
        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
        });
    }

    const navigationLinks = document.querySelectorAll(".navigation_link");
    navigationLinks.forEach(function (link) {
        link.addEventListener("click", scrollToSection);
    });

    const brasilButton = document.getElementById("brasil");
    const japaoButton = document.getElementById("japao");
    const video = document.getElementById("video_trailer");

    function switchTrailer(source) {
        video.src = source;
        video.addEventListener("loadedmetadata", function () {
            video.play();
        });
    }

    brasilButton.addEventListener("click", function () {
        switchTrailer("./assets/trailerInteiro.mp4");
    });

    japaoButton.addEventListener("click", function () {
        switchTrailer("./assets/japanTrailer.mp4");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const personagensSection = document.getElementById("Personagens");

    const modalTitle = modal.querySelector(".modal-title");
    const modalImage = modal.querySelector(".modal-body img");
    const modalClass = modal.querySelector(".modal-body p:nth-child(2)");
    const modalDescription = modal.querySelector(".modal-body p:nth-child(3)");

    function abrirModal(event) {
        const personagem = event.currentTarget.closest(".personagem");
        const nome = personagem.getAttribute("data-name");
        const classe = personagem.getAttribute("data-class");
        const descricao = personagem.getAttribute("data-description");
        const imagem = personagem.getAttribute("data-image");

        modalTitle.textContent = nome;
        modalImage.src = imagem;
        modalClass.textContent = classe;
        modalDescription.textContent = descricao;
        modal.style.display = "block";
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    const personagemButtons = document.querySelectorAll(".button-personagem");
    personagemButtons.forEach(function (button) {
        button.addEventListener("click", abrirModal);
    });

    const fecharButton = modal.querySelector('[data-dismiss="modal"]');
    fecharButton.addEventListener("click", fecharModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            fecharModal();
        }
    });

    window.addEventListener("scroll", function () {
        const personagensRect = personagensSection.getBoundingClientRect();
        if (personagensRect.top >= 0 && personagensRect.bottom <= window.innerHeight) {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
  });
});