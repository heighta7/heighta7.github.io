const Averages = {};
Averages.ADULT = 20;
Averages.MALE = [
    { age: 5, mean: 110.3, std1: 114.9 },
    { age: 6, mean: 116.0, std1: 120.9 },
    { age: 7, mean: 121.7, std1: 127.0 },
    { age: 8, mean: 127.3, std1: 132.9 },
    { age: 9, mean: 132.6, std1: 138.6 },
    { age: 10, mean: 137.8, std1: 144.2 },
    { age: 11, mean: 143.1, std1: 149.8 },
    { age: 12, mean: 149.1, std1: 156.2 },
    { age: 13, mean: 156.0, std1: 163.5 },
    { age: 14, mean: 163.2, std1: 170.9 },
    { age: 15, mean: 169.0, std1: 176.8 },
    { age: 16, mean: 172.9, std1: 180.7 },
    { age: 17, mean: 175.2, std1: 182.8 },
    { age: 18, mean: 176.1, std1: 183.6 },
    { age: 19, mean: 176.5, std1: 183.8 },
];
Averages.FEMALE = [
    { age: 5, mean: 109.6, std1: 114.4 },
    { age: 6, mean: 115.1, std1: 120.2 },
    { age: 7, mean: 120.8, std1: 126.3 },
    { age: 8, mean: 126.6, std1: 132.4 },
    { age: 9, mean: 132.5, std1: 138.6 },
    { age: 10, mean: 138.6, std1: 145.0 },
    { age: 11, mean: 145.0, std1: 151.6 },
    { age: 12, mean: 151.2, std1: 158.1 },
    { age: 13, mean: 156.4, std1: 163.3 },
    { age: 14, mean: 159.8, std1: 166.7 },
    { age: 15, mean: 161.7, std1: 168.5 },
    { age: 16, mean: 162.5, std1: 169.3 },
    { age: 17, mean: 162.9, std1: 169.5 },
    { age: 18, mean: 163.1, std1: 169.7 },
    { age: 19, mean: 163.2, std1: 169.7 },
];



Averages.getStats = (gender, age) => {
    let lower, higher;
    for (let agePoint of gender) {
        if (agePoint.age <= age) {
            if (lower == null || lower.age < agePoint.age) { lower = agePoint; }
        }
        if (agePoint.age >= age) {
            if (higher == null || higher.age > agePoint.age) { higher = agePoint; }
        }
    }
    if (lower == null || lower == higher) { return { mean: higher.mean, std: higher.std1 - higher.mean }; }
    if (higher == null) { return { mean: lower.mean, std: lower.std1 - lower.mean }; }
    
    return { 
        mean: Averages.lerp(age, lower.age, higher.age, lower.mean, higher.mean), 
        std: Averages.lerp(age, lower.age, higher.age, lower.std1 - lower.mean, higher.std1 - higher.mean) 
    };
};
Averages.lerp = (n, start1, stop1, start2, stop2) => {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
Averages.getMaleHeight = (age, percentile) => {
    let stats = Averages.getStats(Averages.MALE, age);
    return gaussian(stats.mean, stats.std).ppf(percentile);
};
Averages.getMalePercentile = (age, height) => {
    let stats = Averages.getStats(Averages.MALE, age);
    return gaussian(stats.mean, stats.std).cdf(height);
};
Averages.getFemaleHeight = (age, percentile) => {
    let stats = Averages.getStats(Averages.FEMALE, age);
    return gaussian(stats.mean, stats.std).ppf(percentile);
};
Averages.getFemalePercentile = (age, height) => {
    let stats = Averages.getStats(Averages.FEMALE, age);
    return gaussian(stats.mean, stats.std).cdf(height);
};