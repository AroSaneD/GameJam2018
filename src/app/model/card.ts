export class Card {

    get icon(): any {
        throw new Error("Not implemented");
    }

    get sound(): any {
        throw new Error("Not implemented");
    }

    // Todo more animations
    get animation(): any {
        throw new Error("Not implemented");
    }


    constructor(
        public iconUrl: string,
        public soundUrl: string,
        public animationUrl: string) {

    }



}