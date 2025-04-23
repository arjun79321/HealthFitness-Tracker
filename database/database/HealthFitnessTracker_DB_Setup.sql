CREATE DATABASE HealthFitnessTracker;
USE HealthFitnessTracker;

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARBINARY(255) NOT NULL,
    PasswordSalt VARBINARY(255) NOT NULL,
    FirstName VARCHAR(50) NULL,
    LastName VARCHAR(50) NULL,
    Weight INT NULL,
    Height INT NULL,
    DateOfBirth DATETIME NULL,
    Gender VARCHAR(20) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Workouts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Duration INT NOT NULL,
    Calories INT NULL,
    Date DATETIME NOT NULL,
    Notes VARCHAR(500) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE INDEX Workouts_UserId ON Workouts(UserId);
CREATE INDEX Workouts_Date ON Workouts(Date);

CREATE TABLE CalorieEntries (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    FoodName VARCHAR(100) NOT NULL,
    Calories INT NOT NULL,
    MealType VARCHAR(50) NOT NULL,
    Date DATETIME NOT NULL,
    Notes VARCHAR(200) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE INDEX CalorieEntries_UserId ON CalorieEntries(UserId);
CREATE INDEX CalorieEntries_Date ON CalorieEntries(Date);

-- Insert sample user
INSERT INTO Users (Username, Email, PasswordHash, PasswordSalt, FirstName, LastName, Weight, Height, DateOfBirth, Gender) 
VALUES ('testuser', 'test@example.com', 
    CONVERT(VARBINARY, '0x52242D862D46E9995A4A70B718EC0F3FB00F59F929E09D8925CD5DC5B6F0464D9063DFA5ABF9D6F3FDD5FA1D4302E7DC'), 
    CONVERT(VARBINARY, '0x84F7E556486145DD095B46426361543B235E59E3A5D9F9E3FF56AC734EE5CD5D7F0A5B6DC9A64C65D2A0A3C94979080C'), 
    'Test', 'User', 75, 180, '1990-01-01', 'Male');

-- Insert sample workouts
INSERT INTO Workouts (UserId, Type, Name, Duration, Calories, Date, Notes) 
VALUES 
    (1, 'cardio', 'Morning Run', 30, 320, DATEADD(DAY, -7, GETDATE()), 'Felt great, good pace'),
    (1, 'strength', 'Upper Body Workout', 45, 280, DATEADD(DAY, -6, GETDATE()), 'Increased weights on bench press'),
    (1, 'flexibility', 'Yoga Session', 60, 180, DATEADD(DAY, -5, GETDATE()), 'Focus on deep stretching'),
    (1, 'cardio', 'HIIT Training', 25, 350, DATEADD(DAY, -4, GETDATE()), 'Intense session, new personal best'),
    (1, 'strength', 'Leg Day', 50, 400, DATEADD(DAY, -3, GETDATE()), 'Squats and deadlifts'),
    (1, 'cardio', 'Cycling', 45, 480, DATEADD(DAY, -2, GETDATE()), 'Long distance ride'),
    (1, 'sports', 'Basketball', 90, 650, DATEADD(DAY, -1, GETDATE()), 'Pickup game with friends');

-- Insert sample calorie entries
INSERT INTO CalorieEntries (UserId, FoodName, Calories, MealType, Date) 
VALUES 
    (1, 'Oatmeal with fruit', 350, 'breakfast', DATEADD(DAY, -7, GETDATE())),
    (1, 'Chicken salad', 420, 'lunch', DATEADD(DAY, -7, GETDATE())),
    (1, 'Grilled salmon with rice', 580, 'dinner', DATEADD(DAY, -7, GETDATE())),
    (1, 'Greek yogurt', 150, 'snack', DATEADD(DAY, -7, GETDATE())),
    (1, 'Protein smoothie', 280, 'breakfast', DATEADD(DAY, -6, GETDATE())),
    (1, 'Turkey sandwich', 450, 'lunch', DATEADD(DAY, -6, GETDATE())),
    (1, 'Pasta with meatballs', 720, 'dinner', DATEADD(DAY, -6, GETDATE())),
    (1, 'Protein bar', 240, 'snack', DATEADD(DAY, -6, GETDATE())),
    (1, 'Greek yogurt with granola', 340, 'breakfast', GETDATE()),
    (1, 'Chicken caesar salad', 380, 'lunch', GETDATE());
