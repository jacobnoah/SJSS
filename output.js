
      (function() {
        window.addEventListener('DOMContentLoaded', () => {
          
        document.querySelectorAll('.toggle-btn').forEach(el => {
          el.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(target => {
              target.classList.toggle('visible');
            });
          });
      
        });
      
        });
      })();
    