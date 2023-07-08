export function Youtube({ code }) {
  return (
    <div class="video-container">
      <iframe
        loading="lazy"
        class="video"
        src={"https://www.youtube.com/embed/" + code}
        allowfullscreen
      />
    </div>
  );
}
