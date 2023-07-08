export function Youtube({ code }) {
  return (
    <div className="video-container nx-mt-6">
      <iframe
        loading="lazy"
        className="video"
        src={"https://www.youtube.com/embed/" + code}
        allowfullscreen
      />
    </div>
  );
}
