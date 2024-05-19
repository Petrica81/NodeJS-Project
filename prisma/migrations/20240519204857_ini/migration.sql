-- CreateTable
CREATE TABLE "User" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "FullName" TEXT,
    "DateOfBirth" DATETIME,
    "Role" TEXT NOT NULL DEFAULT 'USER',
    "TrainerID" INTEGER,
    CONSTRAINT "User_TrainerID_fkey" FOREIGN KEY ("TrainerID") REFERENCES "Trainer" ("TrainerID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trainer" (
    "TrainerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FullName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT,
    "Specialization" TEXT
);

-- CreateTable
CREATE TABLE "Facility" (
    "FacilityID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Capacity" INTEGER,
    "ContactNumber" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "SessionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserID" INTEGER NOT NULL,
    "TrainerID" INTEGER NOT NULL,
    "FacilityID" INTEGER NOT NULL,
    "SessionDateTime" DATETIME NOT NULL,
    "Duration" INTEGER NOT NULL,
    CONSTRAINT "Session_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Session_TrainerID_fkey" FOREIGN KEY ("TrainerID") REFERENCES "Trainer" ("TrainerID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Session_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "Facility" ("FacilityID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_TrainerID_key" ON "User"("TrainerID");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_Email_key" ON "Trainer"("Email");
