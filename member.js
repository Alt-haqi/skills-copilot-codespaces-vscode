function skillsMember() {
    let member = new Member();
    member.addSkill('JavaScript', 5);
    member.addSkill('React', 4);
    member.addSkill('NodeJS', 3);
    member.addSkill('MongoDB', 3);
    return member.skills;
}