import React from "react";
import TeamCard from "./TeamCard";

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

const Team: React.FC<TeamProps> = ({ members }) => {
  return (
    <section className="w-full bg-white py-8 md:py-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
        {/* 🩵 LEFT: Heading Section */}
        <div className="w-full md:w-[30%] flex items-center justify-center">
          <div className="w-full flex flex-col justify-evenly bg-primary text-center md:text-left shadow-strong p-8 min-h-75">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              OUR
            </h2>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              TEAM
            </h2>
          </div>
        </div>

        {/* RIGHT: Team Grid */}
        <div className="w-full md:w-[70%] flex flex-col justify-center text-primary">
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((member) => (
                  <TeamCard key={member._id} member={member} />
                ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No team members available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
