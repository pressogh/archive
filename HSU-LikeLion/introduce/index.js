const frame = document.getElementById("frame");
const paper = document.getElementById("paper");

let { x, y, width, height } = frame.getBoundingClientRect();

function mouseMove(e) {
    const left = e.clientX - x;
    const top = e.clientY - y;
    const centerX = left - width / 2;
    const centerY = top - height / 2;
    const d = Math.sqrt(centerX ** 2 + centerY ** 2);

    paper.style.boxShadow = `
        ${-centerX / 5}px ${-centerY / 10}px 10px rgba(0, 0, 0, 0.2)
    `;

    paper.style.transform = `
        rotate3d(
        ${-centerY / 100}, ${centerX / 100}, 0, ${d / 45}deg
        )
    `;
}

frame.addEventListener("mouseenter", () => {
    frame.addEventListener("mousemove", mouseMove);
});

frame.addEventListener("mouseleave", () => {
    frame.removeEventListener("mousemove", mouseMove);
    paper.style.boxShadow = "";
    paper.style.transform = "";
});

window.addEventListener("resize", () => {
    rect = frame.getBoundingClientRect();
    x = rect.x;
    y = rect.y;
    width = rect.width;
    height = rect.height;
});
