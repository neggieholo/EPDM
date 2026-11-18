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
    <section className="w-full bg-white py-12 md:py-16 px-5 items-start justify-center min-h-[70vh] flex">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-10 w-full">
        {/* LEFT: Heading Section */}
        <div className="flex items-center justify-center bg-primary shadow-strong rounded-lg px-6 py-8 md:px-8 shrink-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center sm:text-left">
            OUR
            <br />
            TEAM
          </h2>
        </div>

        {/* RIGHT: Team Grid */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-4 sm:py-6 text-primary">
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members
                .toSorted((a, b) => (a.order || 0) - (b.order || 0))
                .map((member) => (
                  <TeamCard key={member._id} member={member} />
                ))}
            </div>
          ) : (
            <p className="text-gray-400">No team members available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
