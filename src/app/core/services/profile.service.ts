import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface UserProfile {
    username: string;
    email: string;
    bio?: string;
    profilePicture?: string;
    createdAt?: string;
}

export interface ProfileResponse {
    success: boolean;
    message: string;
    data: UserProfile;
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProfile(id: string) {
        return this.http.get<ProfileResponse>(`${this.apiUrl}/profile/${id}`);
    }

    updateProfile(data: { bio?: string, profilePicture?: string }) {
        return this.http.put<ProfileResponse>(`${this.apiUrl}/profile`, data);
    }
}
