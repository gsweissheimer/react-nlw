export function useDate() {

    interface CalculateAge {
      (birthdate: string): string;
    }

    const calculateAge: CalculateAge = (birthdate) => {
      const birthDate = new Date(birthdate);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      return `${years} anos`;
    };

    return {
            calculateAge
        }
    
}