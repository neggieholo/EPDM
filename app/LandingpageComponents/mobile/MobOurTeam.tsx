import React from "react";
import TeamCard from "@/app/LandingpageComponents/TeamCard";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: string;
  bio: string;
  order?: number;
}

interface TeamProps {
  members: TeamMember[] | null;
}

const MobTeam: React.FC<TeamProps> = ({ members }) => {
  return (
    <section className="bg-white w-full px-5 py-10">
      <div className="w-full flex flex-col gap-6">
        {/* TOP: TEAM HEADING */}
        <div className="w-full bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
          <h2 className="text-4xl font-extrabold text-white leading-tight text-center">
            OUR
            <br />
            TEAM
          </h2>
        </div>

        {/* TEAM MEMBERS GRID */}
        <div className="w-full flex flex-col items-center text-primary p-2">
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {members
                .toSorted((a, b) => (a.order || 0) - (b.order || 0))
                .map((member) => (
                  <TeamCard key={member._id} member={member} />
                ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              No team members available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobTeam;
