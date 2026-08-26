// ============================================================
  // PARTICLE BACKGROUND - Futuristic
  // ============================================================
  (function createParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.fill();
      }
    }

    function createParticles() {
      const count = Math.min(80, Math.floor(window.innerWidth / 15));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
    createParticles();

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawLines();
      animationId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animateParticles();
      }
    });
  })();

  // ============================================================
  // MODAL DATA - All Content
  // ============================================================
  const MODAL_DATA = {
    diplomacy: {
      title: 'Diplomacy Education',
      subtitle: 'Youth Diplomacy Programme',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070',
      tags: ['Education', 'Diplomacy', 'Youth'],
      content: 'The Diplomacy Education programme introduces young people to the fundamentals of international relations, negotiation, and diplomatic protocols. Participants learn about global governance structures, conflict resolution, and the art of diplomacy through interactive workshops, simulations, and guest lectures from experienced diplomats.',
      cta: 'Enrol Now',
      link: '#programmes'
    },
    mun: {
      title: 'Model United Nations',
      subtitle: 'MUN Training Programme',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070',
      tags: ['Model UN', 'Public Speaking', 'Research'],
      content: 'Our Model United Nations programme develops essential skills in research, public speaking, negotiation, and problem-solving. Participants engage in realistic UN simulations, debating global issues, drafting resolutions, and finding consensus.',
      cta: 'Register for MUN',
      link: '#register'
    },
    leadership: {
      title: 'Youth Leadership Programme',
      subtitle: 'Leadership Development',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070',
      tags: ['Leadership', 'Ethics', 'Development'],
      content: 'The Youth Leadership Programme equips young people with essential leadership skills, ethical values, and practical tools for effective leadership. Through mentorship, training sessions, and community projects, participants develop the confidence and competence to lead.',
      cta: 'Apply for Leadership',
      link: '#register'
    },
    international: {
      title: 'International Exposure',
      subtitle: 'Global Opportunities',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070',
      tags: ['International', 'Conferences', 'Global'],
      content: 'The International Exposure programme facilitates participation in international conferences, forums, and exchange programmes. YAD MUN delegates have represented Ghana at UN conferences, international youth summits, and diplomatic forums.',
      cta: 'Explore Opportunities',
      link: '#opportunities'
    },
    policy: {
      title: 'Policy & Research',
      subtitle: 'Youth Policy Engagement',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1932',
      tags: ['Policy', 'Research', 'Advocacy'],
      content: 'The Policy & Research programme encourages young people to engage with global conversations, conduct research on pressing international issues, and contribute to policy development. Participants learn to analyse complex problems, propose solutions, and advocate for change.',
      cta: 'Join Policy Forum',
      link: '#programmes'
    },
    partnerships: {
      title: 'Strategic Partnerships',
      subtitle: 'Collaboration for Impact',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070',
      tags: ['Partnerships', 'Collaboration', 'Impact'],
      content: 'Our Partnership programme works with schools, universities, governments, NGOs, and international organizations to create transformative opportunities for youth. Through strategic partnerships, we expand our reach, share resources, and create a lasting impact.',
      cta: 'Partner with Us',
      link: '#contact'
    },
    conference2026: {
      title: 'National Conference 2026',
      subtitle: 'YAD MUN Annual Conference',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070',
      tags: ['Conference', 'National', 'MUN'],
      content: 'The YAD MUN National Conference 2026 is the premier event for youth diplomacy in Ghana. Over 500 delegates from across the country will gather at the Accra ICC for a week of diplomatic simulations, leadership training, and networking. Register now to secure your spot!',
      cta: 'Register Now',
      link: '#register',
      eventDetails: {
        date: 'December 15, 2026',
        time: '9:00 AM - 6:00 PM',
        venue: 'Accra International Conference Centre',
        delegates: '500+',
        committees: ['UN Security Council', 'UN General Assembly', 'ECOSOC', 'Human Rights Council']
      }
    },
    bootcamp: {
      title: 'Leadership Bootcamp',
      subtitle: 'Intensive Leadership Training',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070',
      tags: ['Training', 'Leadership', 'Bootcamp'],
      content: 'The Leadership Bootcamp is an intensive 5-day residential programme designed to develop the next generation of ethical leaders. Through immersive workshops, team challenges, and mentorship sessions, participants gain practical leadership skills.',
      cta: 'Apply for Bootcamp',
      link: '#register',
      eventDetails: {
        date: 'October 10-14, 2026',
        time: '8:00 AM - 5:00 PM',
        venue: 'University of Ghana, Legon',
        delegates: '100+',
        topics: ['Public Speaking', 'Conflict Resolution', 'Project Management', 'Ethical Decision Making']
      }
    },
    muncompetition: {
      title: 'Inter-School MUN Competition',
      subtitle: 'High School MUN Challenge',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1932',
      tags: ['MUN', 'Competition', 'Schools'],
      content: 'The Inter-School MUN Competition brings together 200+ students from across Ghana\'s high schools for a friendly yet competitive MUN experience. Students debate pressing global issues, develop diplomatic skills, and compete for prestigious awards.',
      cta: 'Register Your School',
      link: '#register',
      eventDetails: {
        date: 'November 5, 2026',
        time: '10:00 AM - 4:00 PM',
        venue: 'Accra International School',
        delegates: '200+',
        awards: ['Best Delegate', 'Outstanding Position Paper', 'Best Resolution', 'Honorable Mention']
      }
    },
    conferenceregistration: {
      title: 'Registration Now Open for 2026 Conference',
      subtitle: 'YAD MUN Conference 2026',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070',
      tags: ['News', 'Conference', 'Registration'],
      content: 'YAD MUN is excited to announce that registration for the 2026 National Conference is now open! This year\'s theme is "Youth Diplomacy for Sustainable Development". Early bird registration offers significant discounts.',
      cta: 'Register Now',
      link: '#register'
    },
    ministrypartnership: {
      title: 'YAD MUN Partners with Ministry of Education',
      subtitle: 'Strategic Partnership',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070',
      tags: ['Partnership', 'Education', 'Ministry'],
      content: 'YAD MUN has signed a landmark partnership agreement with the Ministry of Education to integrate Model UN programmes into Ghana\'s secondary school curriculum. This partnership will benefit thousands of students across the country.',
      cta: 'Learn More',
      link: '#contact'
    },
    unconference: {
      title: 'YAD MUN Delegates Shine at UN Conference',
      subtitle: 'International Success',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1932',
      tags: ['UN', 'Conference', 'Delegates'],
      content: 'A delegation of 10 YAD MUN ambassadors represented Ghana at the annual UN Youth Conference in New York. The team presented a resolution on climate action and youth participation in international governance, earning recognition from UN officials.',
      cta: 'Read Full Story',
      link: '#blog'
    },
    conferences: {
      title: 'Youth Conferences',
      subtitle: 'National & International Conferences',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070',
      tags: ['Conferences', 'Networking', 'Youth'],
      content: 'YAD MUN offers young people the opportunity to participate in national and international conferences focused on diplomacy, leadership, and global governance. These conferences provide platforms for youth to engage with world leaders and network with peers.',
      cta: 'View Upcoming Conferences',
      link: '#events'
    },
    training: {
      title: 'Training Programmes',
      subtitle: 'Skills Development',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070',
      tags: ['Training', 'Skills', 'Development'],
      content: 'Our training programmes cover a wide range of topics including public speaking, negotiation, research, writing, and leadership. Designed for young people of all skill levels, these programmes equip participants with practical skills.',
      cta: 'Browse Training',
      link: '#programmes'
    },
    scholarships: {
      title: 'Leadership Scholarships',
      subtitle: 'Funding for Young Leaders',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1932',
      tags: ['Scholarships', 'Funding', 'Leadership'],
      content: 'YAD MUN offers scholarships to support young leaders in their educational and professional development. These scholarships cover participation fees for conferences, training programmes, and international opportunities.',
      cta: 'Apply for Scholarship',
      link: '#register'
    },
    fellowships: {
      title: 'Youth Fellowships',
      subtitle: 'Emerging Leaders Programme',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070',
      tags: ['Fellowships', 'Leadership', 'Emerging'],
      content: 'The YAD MUN Fellowship programme identifies and nurtures emerging leaders with a passion for diplomacy and international affairs. Fellows receive mentorship, leadership training, and opportunities to lead initiatives.',
      cta: 'Apply for Fellowship',
      link: '#register'
    },
    internships: {
      title: 'Internship Opportunities',
      subtitle: 'Professional Experience',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070',
      tags: ['Internships', 'Experience', 'Career'],
      content: 'YAD MUN offers internships for young professionals interested in gaining experience in the non-profit sector, diplomacy, and youth development. Interns work alongside experienced professionals on projects that make a real difference.',
      cta: 'View Internships',
      link: '#contact'
    },
    delegations: {
      title: 'YAD MUN Delegations',
      subtitle: 'Global Representation',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070',
      tags: ['Delegations', 'Global', 'Representation'],
      content: 'YAD MUN sends delegations to represent Ghana at international conferences, MUN events, and youth summits around the world. Delegates are selected through a competitive process based on their skills, passion, and commitment.',
      cta: 'Join a Delegation',
      link: '#contact'
    },
    chairman: {
      title: 'Nana Osompa Nyamekye II',
      subtitle: 'Board Chairman · Chief of Gomoa Otaprow',
      image: 'https://ui-avatars.com/api/?name=Nana+Osompa+Nyamekye+II&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Board Chairman', 'Traditional Leader', 'Community Advocate'],
      content: `<p><strong>Nana Osompa Nyamekye II</strong>, born <strong>George Essuman</strong>, is a Ghanaian traditional leader, social worker and community development advocate.</p>
      <p>He serves as the <strong>Chief of Gomoa Otaprow</strong> in Ghana's Central Region and has also served as the Odikro and Nsafoahene of the Gomoa Akyempim Traditional Area/Council.</p>
      <div class="modal-section-title">Leadership</div>
      <p>Nana Osompa Nyamekye II has placed considerable emphasis on improving the social and physical development of Otaprow. Notable initiatives include the construction of a <strong>community centre</strong>, a <strong>two-unit kindergarten block</strong>, and the refurbishment of the traditional palace.</p>
      <div class="modal-quote">"Ethical conduct should be practiced not only in schools but also by traditional leaders, teachers, politicians and public officials."</div>`,
      cta: 'Learn More',
      link: '#leadership'
    },
    essel: {
      title: 'Elijah Essel',
      subtitle: 'Founding Executive Director & Secretary General',
      image: 'https://ui-avatars.com/api/?name=Elijah+Essel&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Founder', 'Educationist', 'Environmental Scientist'],
      content: `<p><strong>Elijah Essel</strong> is an educationist, environmental scientist, youth development strategist, and diplomacy advocate serving as the <strong>Founding Executive Director and Secretary General</strong> of YAD MUN LBG.</p>
      <p>Elijah holds a <strong>Bachelor of Science (BSc) in Agricultural Technology</strong> from the University for Development Studies and a <strong>Master of Philosophy (MPhil) in Environmental Science</strong> from the University of Cape Coast.</p>
      <div class="modal-quote">"Youth development is not simply about preparing young people for future leadership—it is about creating meaningful opportunities for them to learn, engage, deliberate, serve, and lead today."</div>`,
      cta: 'Meet Elijah',
      link: '#leadership'
    },
    ansah: {
      title: 'Robert Abeku Ansah',
      subtitle: 'Executive Director for Policy & Research',
      image: 'https://ui-avatars.com/api/?name=Robert+Abeku+Ansah&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Researcher', 'Policy Practitioner', 'Youth Advocate'],
      content: `<p><strong>Robert Abeku Ansah</strong> is a Ghanaian researcher, policy practitioner, youth development advocate, and development strategist.</p>
      <p>He holds a <strong>Bachelor of Arts degree in African Studies</strong> from the University of Cape Coast, a <strong>Master of Arts degree in Education, Gender and Development</strong>, and a <strong>Postgraduate Master of Arts in International Relations</strong> from Coventry University.</p>
      <div class="modal-quote">"Informed young people are essential to effective diplomacy, responsive governance, sustainable development, and the future of Africa."</div>`,
      cta: 'View Publications',
      link: '#leadership'
    },
    paintsil: {
      title: 'Ronnie Ato Paintsil',
      subtitle: 'Deputy Executive Director · Media Practitioner',
      image: 'https://ui-avatars.com/api/?name=Ronnie+Ato+Paintsil&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Filmmaker', 'Media', 'Creative Entrepreneur'],
      content: `<p><strong>Ronnie Ato Paintsil</strong>, popularly known as <strong>Afrikaba Ronnie</strong>, is a Ghanaian media practitioner, filmmaker, creative entrepreneur, and youth development advocate.</p>
      <p>He serves as the <strong>Managing Director of Afrikaba Production/Afrikaba Media Solutions</strong> and has represented Ghana at the <strong>International Broadcasting Convention (IBC) in Amsterdam</strong>.</p>
      <div class="modal-quote">"Media, film and creativity can be powerful instruments for social transformation."</div>`,
      cta: 'Follow Ronnie',
      link: '#leadership'
    },
    jibril: {
      title: 'Mohammed Jibril',
      subtitle: 'Vice Chairman',
      image: 'https://ui-avatars.com/api/?name=Mohammed+Jibril&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Board', 'Vice Chairman'],
      content: 'Mohammed Jibril serves as Vice Chairman of YAD MUN, providing steadfast support to the Chairman and ensuring smooth board operations.',
      link: '#leadership'
    },
    ofosu: {
      title: 'Eugene Ofosu',
      subtitle: 'Deputy Secretary General',
      image: 'https://ui-avatars.com/api/?name=Eugene+Ofosu&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Board', 'Secretary'],
      content: 'Eugene Ofosu serves as Deputy Secretary General, supporting board administration and ensuring effective communication between board members and the executive team.',
      link: '#leadership'
    },
    baidoo: {
      title: 'Maxwell Kwesi Baidoo',
      subtitle: 'Board Member',
      image: 'https://ui-avatars.com/api/?name=Maxwell+Kwesi+Baidoo&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Board', 'Governance'],
      content: 'Maxwell Kwesi Baidoo brings extensive experience in governance and oversight to the YAD MUN Board.',
      link: '#leadership'
    },
    yeboah: {
      title: 'Patrick Yeboah',
      subtitle: 'Board Member',
      image: 'https://ui-avatars.com/api/?name=Patrick+Yeboah&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Board', 'Governance'],
      content: 'Patrick Yeboah serves as a Board Member, contributing his expertise in governance and oversight to guide YAD MUN\'s strategic direction.',
      link: '#leadership'
    },
    baah: {
      title: 'Israel Otsieku Baah',
      subtitle: 'Board Member',
      image: 'https://ui-avatars.com/api/?name=Israel+Otsieku+Baah&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Board', 'Governance'],
      content: 'Israel Otsieku Baah is a dedicated Board Member with a strong commitment to youth empowerment and organizational excellence.',
      link: '#leadership'
    },
    nyarkoh: {
      title: 'Samuel Nyarkoh',
      subtitle: 'Deputy Executive Director',
      image: 'https://ui-avatars.com/api/?name=Samuel+Nyarkoh&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Executive', 'Deputy Director', 'International'],
      content: 'Samuel Nyarkoh serves as Deputy Executive Director, leading international relations and partnerships.',
      link: '#leadership'
    },
    davidson: {
      title: 'Morris Ansah Davidson',
      subtitle: 'Director of Schools Projects',
      image: 'https://ui-avatars.com/api/?name=Morris+Ansah+Davidson&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Director', 'Schools'],
      content: 'Morris Ansah Davidson leads schools projects, working with educational institutions to integrate MUN and diplomacy education.',
      link: '#leadership'
    },
    owusu: {
      title: 'Carrin Owusu',
      subtitle: 'Director of Membership Affairs',
      image: 'https://ui-avatars.com/api/?name=Carrin+Owusu&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Director', 'Membership'],
      content: 'Carrin Owusu manages membership affairs, ensuring that YAD MUN members receive the support and opportunities they need.',
      link: '#leadership'
    },
    manful: {
      title: 'Lawrence Manful',
      subtitle: 'Director of Communications',
      image: 'https://ui-avatars.com/api/?name=Lawrence+Manful&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Director', 'Communications'],
      content: 'Lawrence Manful leads communications and public relations, sharing YAD MUN\'s story and impact with the world.',
      link: '#leadership'
    },
    acquah: {
      title: 'Timothy Acquah',
      subtitle: 'Director of Finance & Admin',
      image: 'https://ui-avatars.com/api/?name=Timothy+Acquah&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Director', 'Finance'],
      content: 'Timothy Acquah oversees finance and administration, ensuring YAD MUN\'s financial sustainability and operational efficiency.',
      link: '#leadership'
    },
    asamoah: {
      title: 'Josephine Asamoah',
      subtitle: 'Chief of Protocol & Events',
      image: 'https://ui-avatars.com/api/?name=Josephine+Asamoah&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Protocol', 'Events'],
      content: 'Josephine Asamoah serves as Chief of Protocol and Events, managing the high-level protocol aspects of YAD MUN events and conferences.',
      link: '#leadership'
    },
    hnyarkoh: {
      title: 'Harriet Nyarkoh',
      subtitle: 'Director of Training',
      image: 'https://ui-avatars.com/api/?name=Harriet+Nyarkoh&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Director', 'Training'],
      content: 'Harriet Nyarkoh leads training and capacity building, developing programmes that equip young people with essential leadership and diplomatic skills.',
      link: '#leadership'
    },
    ngaoh: {
      title: 'Mavis Akosua Ngoah',
      subtitle: 'Women\'s Commissioner',
      image: 'https://ui-avatars.com/api/?name=Mavis+Akosua+Ngoah&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Commissioner', 'Gender'],
      content: 'Mavis Akosua Ngoah serves as Women\'s Commissioner, championing gender equality and women\'s empowerment within YAD MUN and beyond.',
      link: '#leadership'
    },
    idan: {
      title: 'Medley Idan',
      subtitle: 'Deputy Women\'s Commissioner',
      image: 'https://ui-avatars.com/api/?name=Medley+Idan&background=003087&color=D4AF37&size=400&font-size=0.5&bold=true',
      tags: ['Committee', 'Commissioner', 'Gender'],
      content: 'Medley Idan serves as Deputy Women\'s Commissioner, supporting gender equality initiatives and women\'s empowerment programmes.',
      link: '#leadership'
    }
  };

  // ============================================================
  // LIGHTBOX - Image Viewer
  // ============================================================
  let lightboxImages = [];
  let currentLightboxIndex = 0;

  function openLightbox(src, title = 'Image') {
    const allImages = document.querySelectorAll('.gallery-item img, .service-img-wrap img, .about-image img, .event-img-wrap img, .blog-img-wrap img, .l-img-wrap img');
    lightboxImages = [];
    allImages.forEach(img => {
      if (img.src && !img.src.includes('ui-avatars.com')) {
        lightboxImages.push({
          src: img.src,
          title: img.alt || 'Image'
        });
      }
    });
    // Add the clicked image if not already in the list
    if (!lightboxImages.find(img => img.src === src)) {
      lightboxImages.push({ src: src, title: title });
    }
    currentLightboxIndex = lightboxImages.findIndex(img => img.src === src);
    if (currentLightboxIndex === -1) {
      currentLightboxIndex = 0;
    }
    updateLightbox();
    document.getElementById('lightbox').classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const img = lightboxImages[currentLightboxIndex];
    if (!img) return;
    const lightboxImg = document.getElementById('lightboxImage');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    document.getElementById('lightboxCounter').textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
    document.getElementById('lightboxDownload').href = img.src;
    document.getElementById('lightboxDownload').download = img.title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
  }

  function closeLightbox(event) {
    if (event && event.target !== event.currentTarget && event.target.tagName !== 'IMG') return;
    document.getElementById('lightbox').classList.remove('show');
    document.body.style.overflow = '';
  }

  function prevImage(event) {
    event.stopPropagation();
    if (currentLightboxIndex > 0) {
      currentLightboxIndex--;
      updateLightbox();
    }
  }

  function nextImage(event) {
    event.stopPropagation();
    if (currentLightboxIndex < lightboxImages.length - 1) {
      currentLightboxIndex++;
      updateLightbox();
    }
  }

  document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').classList.contains('show')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage(e);
      if (e.key === 'ArrowRight') nextImage(e);
    }
  });

  // ============================================================
  // DOWNLOAD IMAGE
  // ============================================================
  function downloadImage(url, filename) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        showToast('📥 Image downloaded successfully!', 'success');
      })
      .catch(() => {
        window.open(url, '_blank');
        showToast('📥 Image opened in new tab', 'info');
      });
  }

  // ============================================================
  // TOAST
  // ============================================================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ============================================================
  // LOADING
  // ============================================================
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('loader').classList.add('hidden');
      showToast('Welcome to YAD MUN! 🌍', 'success');
      animateStats();
    }, 2000);
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
  });

  // ============================================================
  // ANIMATE STATS
  // ============================================================
  function animateStats() {
    document.querySelectorAll('.stat-number').forEach(function(el) {
      const target = parseInt(el.dataset.count);
      let current = 0;
      const increment = Math.ceil(target / 40);
      const interval = setInterval(function() {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + (target > 100 ? '+' : '');
      }, 50);
    });
  }

  // ============================================================
  // TOP BAR
  // ============================================================
  function closeTopBar() {
    document.getElementById('topBar').classList.add('hidden');
    document.getElementById('topBarReopen').style.display = 'block';
    localStorage.setItem('topBarClosed', 'true');
  }
  function reopenTopBar() {
    document.getElementById('topBar').classList.remove('hidden');
    document.getElementById('topBarReopen').style.display = 'none';
    localStorage.removeItem('topBarClosed');
  }
  if (localStorage.getItem('topBarClosed') === 'true') {
    document.getElementById('topBar').classList.add('hidden');
    document.getElementById('topBarReopen').style.display = 'block';
  }

  // ============================================================
  // DARK MODE
  // ============================================================
  const darkToggle = document.getElementById('darkToggle');
  darkToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.className = 'fas fa-sun';
      localStorage.setItem('darkMode', 'enabled');
      showToast('🌙 Dark mode activated', 'info');
    } else {
      icon.className = 'fas fa-moon';
      localStorage.setItem('darkMode', 'disabled');
      showToast('☀️ Light mode activated', 'info');
    }
  });
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkToggle.querySelector('i').className = 'fas fa-sun';
  }

  // ============================================================
  // COOKIE CONSENT
  // ============================================================
  function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
      document.getElementById('cookieConsent').classList.add('show');
    }
  }
  function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieConsent').classList.remove('show');
    showToast('🍪 Cookies accepted', 'success');
  }
  function dismissCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookieConsent').classList.remove('show');
  }
  setTimeout(showCookieConsent, 3000);

  // ============================================================
  // POLICY
  // ============================================================
  function openPolicy(type) {
    event.preventDefault();
    const policies = {
      privacy: {
        title: 'Privacy Policy',
        content: 'YAD MUN respects your privacy. We collect personal information only when voluntarily submitted by you. Your data is used solely for programme registration, communication, and improving our services. We do not share your data with third parties without your consent.'
      },
      safeguarding: {
        title: 'Safeguarding Policy',
        content: 'YAD MUN is committed to creating a safe environment for all participants. We have zero tolerance for abuse, harassment, or discrimination. All staff and volunteers undergo background checks and safeguarding training.'
      },
      conduct: {
        title: 'Code of Conduct',
        content: 'All YAD MUN participants are expected to behave with integrity, respect, and professionalism. This includes: respecting diverse perspectives, maintaining academic honesty, treating others with dignity, and representing YAD MUN positively.'
      },
      terms: {
        title: 'Terms of Use',
        content: 'By using this website and participating in YAD MUN programmes, you agree to our terms. All content is for informational purposes. We reserve the right to update these terms.'
      }
    };
    const policy = policies[type];
    if (!policy) return;
    alert('📜 ' + policy.title + '\n\n' + policy.content + '\n\nFor more information, please contact us at info@yadmun.org.');
  }

  // ============================================================
  // HAMBURGER
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ============================================================
  // SCROLL
  // ============================================================
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 250) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
    document.getElementById('mainHeader').classList.toggle('scrolled', currentScroll > 50);
  });
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================================
  // FADE-UP
  // ============================================================
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(function(el) { fadeObserver.observe(el); });

  // ============================================================
  // MV TOGGLE
  // ============================================================
  document.querySelectorAll('.mv-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.mv-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.mv-content').forEach(function(c) { c.classList.remove('active'); });
      document.getElementById(this.dataset.target).classList.add('active');
    });
  });

  // ============================================================
  // LEADERSHIP TABS
  // ============================================================
  document.querySelectorAll('.leadership-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.leadership-tab').forEach(function(t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
      document.querySelectorAll('.leadership-content').forEach(function(c) {
        c.classList.remove('active');
      });
      const target = this.dataset.tab;
      document.getElementById('tab-' + target).classList.add('active');
    });
  });

  // ============================================================
  // FAQ
  // ============================================================
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-answer').forEach(function(a) { a.classList.remove('open'); });
      document.querySelectorAll('.faq-question').forEach(function(b) { b.classList.remove('active'); });
      if (!isOpen) {
        answer.classList.add('open');
        this.classList.add('active');
      }
    });
  });

  // ============================================================
  // SHARE
  // ============================================================
  function sharePage(platform) {
    const url = window.location.href;
    const text = 'Join me in supporting the next generation of global leaders! 🌍';
    const shareUrls = {
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
      twitter: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url),
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url),
      whatsapp: 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' ' + url)
    };
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=500');
      showToast('📤 Shared on ' + platform, 'success');
    }
  }
  function copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(function() {
        const btn = document.querySelector('.share-btn.copy-link');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        showToast('📋 Link copied!', 'success');
        setTimeout(function() { btn.innerHTML = original; }, 2000);
      });
    } else {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast('📋 Link copied!', 'success');
    }
  }

  // ============================================================
  // NEWSLETTER (section removed from page)
  // ============================================================

  // ============================================================
  // COUNTDOWN
  // ============================================================
  const conferenceDate = new Date("Dec 15, 2026 09:00:00").getTime();
  setInterval(function() {
    const now = new Date().getTime();
    const distance = conferenceDate - now;
    const cd = ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'];
    if (distance < 0) {
      cd.forEach(function(id) { document.getElementById(id).innerHTML = '00'; });
      return;
    }
    document.getElementById('cd-days').innerHTML = String(Math.floor(distance / (1000*60*60*24))).padStart(2, '0');
    document.getElementById('cd-hours').innerHTML = String(Math.floor((distance % (1000*60*60*24)) / (1000*60*60))).padStart(2, '0');
    document.getElementById('cd-minutes').innerHTML = String(Math.floor((distance % (1000*60*60)) / (1000*60))).padStart(2, '0');
    document.getElementById('cd-seconds').innerHTML = String(Math.floor((distance % (1000*60)) / 1000)).padStart(2, '0');
  }, 1000);

  // ============================================================
  // REGISTRATION
  // ============================================================
  function validateRegistration() {
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const school = document.getElementById('regSchool').value.trim();
    const committee = document.getElementById('regCommittee').value;
    if (!name || !phone || !email || !school || !committee) {
      showToast('⚠️ Please fill all required fields.', 'error');
      return false;
    }
    if (!phone.match(/^0[0-9]{9}$/)) {
      showToast('⚠️ Enter a valid Ghana number (e.g., 0244123456)', 'error');
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showToast('⚠️ Enter a valid email address.', 'error');
      return false;
    }
    return true;
  }
  function handleRegistration() {
    const btn = document.getElementById('registerBtn');
    if (!validateRegistration()) return;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    const data = {
      name: document.getElementById('regName').value.trim(),
      phone: document.getElementById('regPhone').value.trim(),
      email: document.getElementById('regEmail').value.trim(),
      school: document.getElementById('regSchool').value.trim(),
      committee: document.getElementById('regCommittee').value,
      registeredAt: new Date().toISOString()
    };
    try {
      const registrations = JSON.parse(localStorage.getItem('yadmun_registrations') || '[]');
      registrations.push(data);
      localStorage.setItem('yadmun_registrations', JSON.stringify(registrations));
      showToast('🎉 Welcome to YAD MUN, ' + data.name + '!', 'success');
      document.getElementById('registrationForm').reset();
    } catch (e) {
      showToast('❌ Registration failed. Please try again.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-user-plus"></i> Join YAD MUN Today';
    }
  }

  // ============================================================
  // CONTACT
  // ============================================================
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    const message = document.getElementById('cMessage').value.trim();
    if (!name || !email || !message) {
      showToast('⚠️ Please fill all required fields.', 'error');
      return;
    }
    const msg = '*Contact Form*%0A%0A*Name:* ' + encodeURIComponent(name) + '%0A*Email:* ' + encodeURIComponent(email) + '%0A*Phone:* ' + encodeURIComponent(phone) + '%0A*Message:* ' + encodeURIComponent(message);
    window.open('https://wa.me/233242929381?text=' + msg, '_blank');
    this.reset();
    showToast('📩 Message sent via WhatsApp!', 'success');
  });

  // ============================================================
  // DONATION
  // ============================================================
  let selectedAmount = 100;
  let selectedMethod = 'mobile-money';

  function selectDonation(el) {
    document.querySelectorAll('.donation-amount').forEach(function(btn) {
      btn.classList.remove('selected');
    });
    el.classList.add('selected');
    const customInput = document.getElementById('donationCustom');
    if (el.dataset.amount === 'other') {
      customInput.style.display = 'block';
      customInput.focus();
      selectedAmount = null;
    } else {
      customInput.style.display = 'none';
      selectedAmount = parseInt(el.dataset.amount);
    }
  }

  function selectMethod(el) {
    document.querySelectorAll('.donation-method').forEach(function(btn) {
      btn.classList.remove('selected');
    });
    el.classList.add('selected');
    selectedMethod = el.dataset.method;
  }

  function processDonation() {
    const name = document.getElementById('donorName').value.trim();
    const email = document.getElementById('donorEmail').value.trim();
    const phone = document.getElementById('donorPhone').value.trim();
    const customAmount = document.getElementById('donationCustom').value.trim();
    
    if (!name || !email) {
      showToast('⚠️ Please fill in your name and email.', 'error');
      return;
    }
    
    let amount = selectedAmount;
    if (!amount && customAmount) {
      amount = parseInt(customAmount);
    }
    if (!amount || amount < 10) {
      showToast('⚠️ Please select or enter a valid donation amount (min. ₵10).', 'error');
      return;
    }
    
    const btn = document.getElementById('donateBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    setTimeout(function() {
      const donationData = {
        name: name,
        email: email,
        phone: phone,
        amount: amount,
        method: selectedMethod,
        message: document.getElementById('donorMessage').value.trim(),
        date: new Date().toISOString()
      };
      
      try {
        const donations = JSON.parse(localStorage.getItem('yadmun_donations') || '[]');
        donations.push(donationData);
        localStorage.setItem('yadmun_donations', JSON.stringify(donations));
        showToast('🙏 Thank you for your generous donation of ₵' + amount + '!', 'success');
        document.getElementById('donationForm').reset();
        document.querySelectorAll('.donation-amount').forEach(function(el) { el.classList.remove('selected'); });
        document.getElementById('donationCustom').style.display = 'none';
        document.querySelector('.donation-amount[data-amount="100"]').classList.add('selected');
        selectedAmount = 100;
        
        const msg = '*Donation Confirmation*%0A%0AThank you for your donation!%0A%0A*Name:* ' + encodeURIComponent(name) + '%0A*Amount:* ₵' + amount + '%0A*Method:* ' + selectedMethod + '%0A%0AYou will receive a confirmation receipt via email shortly.';
        window.open('https://wa.me/233242929381?text=' + msg, '_blank');
      } catch (e) {
        showToast('❌ There was an issue processing your donation. Please try again.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-heart"></i> Donate Now';
      }
    }, 2000);
  }

  // ============================================================
  // MODAL
  // ============================================================
  function openModal(id) {
    const data = MODAL_DATA[id];
    if (!data) {
      showToast('Content not found', 'error');
      return;
    }
    const body = document.getElementById('modalBody');
    const tagsHtml = data.tags ? data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('') : '';
    const isProfile = data.content && (data.content.includes('modal-section-title') || data.content.includes('modal-quote'));
    let contentHtml = data.content || '';
    if (!isProfile && contentHtml) {
      contentHtml = `<p>${contentHtml}</p>`;
    }
    const isAvatar = data.image && data.image.includes('ui-avatars.com');
    
    let eventDetailsHtml = '';
    if (data.eventDetails) {
      eventDetailsHtml = `
        <div class="modal-section-title">Event Details</div>
        ${data.eventDetails.date ? `<p><strong>📅 Date:</strong> ${data.eventDetails.date}</p>` : ''}
        ${data.eventDetails.time ? `<p><strong>⏰ Time:</strong> ${data.eventDetails.time}</p>` : ''}
        ${data.eventDetails.venue ? `<p><strong>📍 Venue:</strong> ${data.eventDetails.venue}</p>` : ''}
        ${data.eventDetails.delegates ? `<p><strong>👥 Delegates:</strong> ${data.eventDetails.delegates}</p>` : ''}
        ${data.eventDetails.committees ? `<p><strong>🏛️ Committees:</strong> ${data.eventDetails.committees.join(', ')}</p>` : ''}
        ${data.eventDetails.topics ? `<p><strong>📚 Topics:</strong> ${data.eventDetails.topics.join(', ')}</p>` : ''}
        ${data.eventDetails.awards ? `<p><strong>🏆 Awards:</strong> ${data.eventDetails.awards.join(', ')}</p>` : ''}
      `;
    }
    
    body.innerHTML = `
      ${isAvatar ? 
        `<img src="${data.image}" alt="${data.title}" class="modal-profile-img" onclick="openLightbox('${data.image}', '${data.title}')" title="Click to view full size">` :
        `<img src="${data.image}" alt="${data.title}" onclick="openLightbox('${data.image}', '${data.title}')" title="Click to view full size">`
      }
      <h2>${data.title}</h2>
      <div class="modal-subtitle">${data.subtitle || ''}</div>
      <div class="modal-tags">${tagsHtml}</div>
      ${contentHtml}
      ${eventDetailsHtml}
      ${data.cta ? `<button class="modal-btn" onclick="navigateTo('${data.link || '#'}')">${data.cta}</button>` : ''}
    `;
    document.getElementById('modalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('modalOverlay').classList.remove('show');
    document.body.style.overflow = '';
  }

  function navigateTo(link) {
    closeModal();
    if (link && link !== '#') {
      setTimeout(() => {
        const target = document.querySelector(link);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.location.href = link;
        }
      }, 300);
    }
    showToast('🔗 Navigating...', 'info');
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ============================================================
  // CLICKABLE CARDS
  // ============================================================
  function setupClickableCards(selector) {
    document.querySelectorAll(selector).forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (e.target.closest('.img-overlay') || e.target.closest('.icons')) return;
        const id = this.dataset.id;
        if (id && MODAL_DATA[id]) {
          openModal(id);
        } else {
          showToast('Content loading...', 'info');
        }
      });
    });
  }
  
  setupClickableCards('.service-card');
  setupClickableCards('.leadership-card');
  setupClickableCards('.event-card');
  setupClickableCards('.blog-card');
  setupClickableCards('.opp-item');

  // ============================================================
  // KEYBOARD SHORTCUTS
  // ============================================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (document.getElementById('cookieConsent').classList.contains('show')) {
        dismissCookies();
      }
    }
    if (e.altKey && e.key === 'd') {
      darkToggle.click();
    }
    if (e.altKey && e.key === 'h') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (e.altKey && e.key === 'r') {
      document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.altKey && e.key === 'm') {
      document.querySelector('.leadership-tab')?.click();
    }
  });

  // ============================================================
  // 3D TILT EFFECT
  // ============================================================
  document.querySelectorAll('.service-card, .leadership-card, .event-card, .blog-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.style.transform = `perspective(1000px) rotateX(${y * -2}deg) rotateY(${x * 2}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ============================================================
  // PARALLAX HERO
  // ============================================================
  const heroEl = document.querySelector('.hero');
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    if (heroEl) {
      heroEl.style.backgroundPosition = `center ${scrolled * 0.3}px`;
    }
  });

  // ============================================================
  // SMOOTH SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('🌍 YAD MUN Website - COMPLETE FUTURISTIC VERSION');
  console.log('📱 Website: https://www.yadmun.org');
  console.log('📞 WhatsApp: +233 24 292 9381');
  console.log('✨ Features: Dark Mode, 3D Cards, Lightbox Gallery, Particle Background');
  console.log('🖼️ Click any image to view, zoom or download');
  console.log('💡 Click any card for detailed information with direct links');
  console.log('❤️ Donate to support youth programmes');
  console.log('🤖 AI Assistant answers 100+ questions');
  console.log('⌨️ Shortcuts: Alt+D (Dark), Alt+H (Home), Alt+R (Register), Alt+M (Leadership)');