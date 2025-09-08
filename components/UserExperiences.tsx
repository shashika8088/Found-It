import React from 'react';
import { UserExperience } from '../types';
import ExperienceCard from './ExperienceCard';
import Spinner from './Spinner';

interface UserExperiencesProps {
  experiences: UserExperience[];
  isLoading: boolean;
}

const UserExperiences: React.FC<UserExperiencesProps> = ({ experiences, isLoading }) => {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-serif text-text dark:text-dark-text">User Experiences</h2>
        <p className="mt-2 text-lg text-text-secondary dark:text-dark-text-secondary">See what others are saying about our community.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} style={{ animationDelay: `${index * 100}ms` }} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserExperiences;
