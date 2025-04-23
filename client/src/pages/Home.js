import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useState, useEffect } from "react";


const Home = () => {

  const fitnessTexts = [
    "Build Strength 💪",
    "Burn Calories 🔥",
    "Stay Active 🏃‍♂️",
    "Eat Healthy 🥗",
    "Boost Endurance 🚴‍♂️",
    "Stay Hydrated 💧",



  ];
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % fitnessTexts.length);
    }, 2000); // Change text every 2 sec

    return () => clearInterval(interval);
  }, []);




  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="home-page">
      <div className="hero-section text-center">
        <div className="container">
          <h1 className="hero-title" style={{color:'#fff'}}>
            Achieve Your{" "}
            <span className="scroll-text">{fitnessTexts[currentText]}</span>
          </h1>
          <p className="lead text-light">
            Track workouts, monitor calories, and transform your health.
          </p>

          {!isAuthenticated ? (
            <div className="cta-buttons">
              <Link
                to="/register"
                className="btn btn-lg btn-warning text-dark fw-bold shadow move-btn"
              >
                🚀 Get Started
              </Link>
              <Link
                to="/login"
                className="btn btn-lg btn-outline-light shadow move-btn"
              >
                🔑 Login
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="btn btn-lg btn-success fw-bold px-4 py-2 shadow move-btn"
            >
              🏋️‍♂️ Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* key and feature */}

  
      {/* <h6 className='health'>Helth and fitness</h6>
      <hr></hr> */}
    
<section id="gallery">
    <div class="container mt-5">
        <h2 class="text-center mb-4" style={{color:'#000'}}>🏋️‍♂️ Health & Fitness Gallery</h2>
        <hr></hr>
        <div class="row">
            {/* <!-- Card 1: Gym Workout --> */}
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <img src="https://plus.unsplash.com/premium_photo-1664109999537-088e7d964da2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Gym Workout" class="card-img-top"/>
                    <div class="card-body">
                        <h5 class="card-title">Gym Workout</h5>
                        <p class="card-text" style={{color:'#000'}}>Stay strong with daily weight training and cardio exercises. Build muscle and burn fat effectively.</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Read More</a>
                        <a href="#" class="btn btn-outline-danger btn-sm"><i class="far fa-heart"></i></a>
                    </div>
                </div>
            </div>
            
            {/* <!-- Card 2: Yoga & Meditation --> */}
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Yoga & Meditation" class="card-img-top"/>
                    <div class="card-body">
                        <h5 class="card-title">Yoga & Meditation</h5>
                        <p class="card-text" style={{color:'#000'}}>Improve flexibility, reduce stress, and enhance mental peace with daily yoga and mindfulness sessions.</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Read More</a>
                        <a href="#" class="btn btn-outline-danger btn-sm"><i class="far fa-heart"></i></a>
                    </div>
                </div>
            </div>
            
            {/* <!-- Card 3: Healthy Diet --> */}
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Healthy Diet" class="card-img-top"/>
                    <div class="card-body">
                        <h5 class="card-title">Healthy Diet</h5>
                        <p class="card-text" style={{color:'#000'}}>Fuel your body with a balanced diet rich in proteins, vitamins, and essential nutrients. vitamins, and essential nutrients</p>
                        <a href="#" class="btn btn-outline-success btn-sm">Read More</a>
                        <a href="#" class="btn btn-outline-danger btn-sm"><i class="far fa-heart"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>






      {/* edn key nd  */}



      {/* add sub card for health imagaes */}



      <section class="light">
        <div class="container py-2">
          <div class="h1 text-center text-dark" id="pageHeaderTitle">Health & Fitness Tips</div>

          <article class="postcard light blue">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Morning Yoga" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title blue"><a href="#">Morning Yoga Routine</a></h1>
              <div class="postcard__subtitle small">
                <time datetime="2023-10-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Wed, Oct 25th 2023
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">Start your day with a refreshing yoga routine. Morning yoga helps improve flexibility, boosts energy, and reduces stress. Try these 5 simple poses to kickstart your day: Sun Salutation, Downward Dog, Warrior Pose, Tree Pose, and Child's Pose.</div>
              <ul class="postcard__tagbox">
                <li class="tag__item"><i class="fas fa-tag mr-2"></i>Yoga</li>
                <li class="tag__item"><i class="fas fa-clock mr-2"></i>10 mins.</li>
                <li class="tag__item play blue">
                  <a href="#"><i class="fas fa-play mr-2"></i>Watch Video</a>
                </li>
              </ul>
            </div>
          </article>

          <article class="postcard light red">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Healthy Eating" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title red"><a href="#">Healthy Eating Habits</a></h1>
              <div class="postcard__subtitle small">
                <time datetime="2023-10-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Wed, Oct 25th 2023
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">Eating healthy doesn't have to be complicated. Focus on whole foods like fruits, vegetables, lean proteins, and whole grains. Avoid processed foods and sugary drinks. Here are 5 tips for maintaining a balanced diet: Plan your meals, stay hydrated, control portion sizes, limit sugar, and eat mindfully.</div>
              <ul class="postcard__tagbox">
                <li class="tag__item"><i class="fas fa-tag mr-2"></i>Nutrition</li>
                <li class="tag__item"><i class="fas fa-clock mr-2"></i>7 mins.</li>
                <li class="tag__item play red">
                  <a href="#"><i class="fas fa-play mr-2"></i>Learn More</a>
                </li>
              </ul>
            </div>
          </article>

          <article class="postcard light green">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Cardio Workout" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title green"><a href="#">Cardio Workout for Beginners</a></h1>
              <div class="postcard__subtitle small">
                <time datetime="2023-10-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Wed, Oct 25th 2023
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">Cardio workouts are great for improving heart health and burning calories. If you're new to cardio, start with low-impact exercises like walking, cycling, or swimming. Gradually increase intensity and duration. Here are 3 beginner-friendly cardio exercises: Brisk walking, jumping jacks, and stationary cycling.</div>
              <ul class="postcard__tagbox">
                <li class="tag__item"><i class="fas fa-tag mr-2"></i>Cardio</li>
                <li class="tag__item"><i class="fas fa-clock mr-2"></i>15 mins.</li>
                <li class="tag__item play green">
                  <a href="#"><i class="fas fa-play mr-2"></i>Start Workout</a>
                </li>
              </ul>
            </div>
          </article>

          <article class="postcard light yellow">
            <a class="postcard__img_link" href="#">
              <img class="postcard__img" src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Mental Health" />
            </a>
            <div class="postcard__text t-dark">
              <h1 class="postcard__title yellow"><a href="#">Mental Health & Wellness</a></h1>
              <div class="postcard__subtitle small">
                <time datetime="2023-10-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Wed, Oct 25th 2023
                </time>
              </div>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">Taking care of your mental health is just as important as physical health. Practice mindfulness, meditation, and self-care to reduce stress and improve well-being. Here are 5 tips for better mental health: Get enough sleep, stay connected with loved ones, exercise regularly, practice gratitude, and seek professional help if needed.</div>
              <ul class="postcard__tagbox">
                <li class="tag__item"><i class="fas fa-tag mr-2"></i>Wellness</li>
                <li class="tag__item"><i class="fas fa-clock mr-2"></i>12 mins.</li>
                <li class="tag__item play yellow">
                  <a href="#"><i class="fas fa-play mr-2"></i>Read More</a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>



    </div>
  );
};

export default Home;