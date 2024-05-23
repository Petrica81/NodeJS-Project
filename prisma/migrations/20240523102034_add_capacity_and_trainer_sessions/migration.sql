/*
  Warnings:

  - You are about to drop the column `Duration` on the `Session` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "SessionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserID" INTEGER NOT NULL,
    "TrainerID" INTEGER NOT NULL,
    "FacilityID" INTEGER NOT NULL,
    "SessionDateTime" DATETIME NOT NULL,
    CONSTRAINT "Session_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Session_TrainerID_fkey" FOREIGN KEY ("TrainerID") REFERENCES "Trainer" ("TrainerID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Session_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "Facility" ("FacilityID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("FacilityID", "SessionDateTime", "SessionID", "TrainerID", "UserID") SELECT "FacilityID", "SessionDateTime", "SessionID", "TrainerID", "UserID" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check("Session");
PRAGMA foreign_keys=ON;
