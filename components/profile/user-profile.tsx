"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Edit, Save, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 임시 사용자 데이터 - 실제로는 API에서 가져와야 함
const dummyUser = {
  id: 1,
  username: "요리왕",
  email: "chef@example.com",
  bio: "맛있는 요리를 만드는 것을 좋아합니다. 특히 한식과 이탈리안 요리에 관심이 많습니다.",
  profileImage: "/placeholder.svg?height=200&width=200",
  joinDate: "2023-01-15",
  preferences: {
    dietaryRestrictions: ["글루텐프리", "저탄수화물"],
    favoriteCuisines: ["한식", "이탈리안", "멕시칸"],
    spicyPreference: "중간",
    cookingSkill: "중급",
  },
  stats: {
    recipes: 12,
    mealPlans: 5,
    favorites: 24,
  },
  notifications: {
    emailNotifications: true,
    recipeUpdates: true,
    mealPlanReminders: true,
  },
}

export default function UserProfile() {
  const [user, setUser] = useState(dummyUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(dummyUser)
  const { toast } = useToast()

  const handleEditToggle = () => {
    if (isEditing) {
      // 저장 로직
      setUser(editedUser)
      toast({
        title: "프로필 업데이트",
        description: "프로필이 성공적으로 업데이트되었습니다.",
      })
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedUser({ ...editedUser, [field]: value })
  }

  const handlePreferenceChange = (field: string, value: any) => {
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        [field]: value,
      },
    })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setEditedUser({
      ...editedUser,
      notifications: {
        ...editedUser.notifications,
        [field]: value,
      },
    })
  }

  const handleUploadImage = () => {
    // 실제 구현에서는 이미지 업로드 로직
    toast({
      title: "이미지 업로드",
      description: "프로필 이미지가 업로드되었습니다.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>내 프로필</CardTitle>
            <CardDescription>개인 정보 및 설정을 관리하세요</CardDescription>
          </div>
          <Button variant={isEditing ? "default" : "outline"} onClick={handleEditToggle}>
            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
            {isEditing ? "저장" : "편집"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="preferences">선호도</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.username} />
                  <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" onClick={handleUploadImage}>
                    <Upload className="mr-2 h-4 w-4" />
                    이미지 변경
                  </Button>
                )}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">가입일: {user.joinDate}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">사용자 이름</Label>
                    {isEditing ? (
                      <Input
                        id="username"
                        value={editedUser.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                      />
                    ) : (
                      <div className="p-2 border rounded-md">{user.username}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    ) : (
                      <div className="p-2 border rounded-md">{user.email}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editedUser.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 border rounded-md min-h-[80px]">{user.bio}</div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <span className="text-2xl font-bold">{user.stats.recipes}</span>
                    <span className="text-sm text-muted-foreground">레시피</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <span className="text-2xl font-bold">{user.stats.mealPlans}</span>
                    <span className="text-sm text-muted-foreground">식단</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <span className="text-2xl font-bold">{user.stats.favorites}</span>
                    <span className="text-sm text-muted-foreground">즐겨찾기</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>식이 제한</Label>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {["글루텐프리", "저탄수화물", "비건", "채식", "유제품 없음"].map((restriction) => (
                      <Badge
                        key={restriction}
                        variant={
                          editedUser.preferences.dietaryRestrictions.includes(restriction) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          const current = [...editedUser.preferences.dietaryRestrictions]
                          if (current.includes(restriction)) {
                            handlePreferenceChange(
                              "dietaryRestrictions",
                              current.filter((r) => r !== restriction),
                            )
                          } else {
                            handlePreferenceChange("dietaryRestrictions", [...current, restriction])
                          }
                        }}
                      >
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.dietaryRestrictions.map((restriction) => (
                      <Badge key={restriction}>{restriction}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>선호하는 요리</Label>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {["한식", "중식", "일식", "이탈리안", "멕시칸", "인도", "태국"].map((cuisine) => (
                      <Badge
                        key={cuisine}
                        variant={editedUser.preferences.favoriteCuisines.includes(cuisine) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const current = [...editedUser.preferences.favoriteCuisines]
                          if (current.includes(cuisine)) {
                            handlePreferenceChange(
                              "favoriteCuisines",
                              current.filter((c) => c !== cuisine),
                            )
                          } else {
                            handlePreferenceChange("favoriteCuisines", [...current, cuisine])
                          }
                        }}
                      >
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.favoriteCuisines.map((cuisine) => (
                      <Badge key={cuisine}>{cuisine}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spicy-preference">매운맛 선호도</Label>
                  {isEditing ? (
                    <select
                      id="spicy-preference"
                      className="w-full p-2 border rounded-md"
                      value={editedUser.preferences.spicyPreference}
                      onChange={(e) => handlePreferenceChange("spicyPreference", e.target.value)}
                    >
                      <option value="안매운맛">안매운맛</option>
                      <option value="약간 매운맛">약간 매운맛</option>
                      <option value="중간">중간</option>
                      <option value="매운맛">매운맛</option>
                      <option value="아주 매운맛">아주 매운맛</option>
                    </select>
                  ) : (
                    <div className="p-2 border rounded-md">{user.preferences.spicyPreference}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cooking-skill">요리 실력</Label>
                  {isEditing ? (
                    <select
                      id="cooking-skill"
                      className="w-full p-2 border rounded-md"
                      value={editedUser.preferences.cookingSkill}
                      onChange={(e) => handlePreferenceChange("cookingSkill", e.target.value)}
                    >
                      <option value="초보">초보</option>
                      <option value="초중급">초중급</option>
                      <option value="중급">중급</option>
                      <option value="중상급">중상급</option>
                      <option value="전문가">전문가</option>
                    </select>
                  ) : (
                    <div className="p-2 border rounded-md">{user.preferences.cookingSkill}</div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">중요 업데이트 및 알림을 이메일로 받습니다.</p>
                </div>
                {isEditing ? (
                  <Switch
                    id="email-notifications"
                    checked={editedUser.notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                ) : (
                  <Badge variant={user.notifications.emailNotifications ? "default" : "outline"}>
                    {user.notifications.emailNotifications ? "활성화" : "비활성화"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recipe-updates">레시피 업데이트</Label>
                  <p className="text-sm text-muted-foreground">새로운 레시피 및 업데이트 알림을 받습니다.</p>
                </div>
                {isEditing ? (
                  <Switch
                    id="recipe-updates"
                    checked={editedUser.notifications.recipeUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("recipeUpdates", checked)}
                  />
                ) : (
                  <Badge variant={user.notifications.recipeUpdates ? "default" : "outline"}>
                    {user.notifications.recipeUpdates ? "활성화" : "비활성화"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="meal-plan-reminders">식단 알림</Label>
                  <p className="text-sm text-muted-foreground">식단 계획 및 준비 알림을 받습니다.</p>
                </div>
                {isEditing ? (
                  <Switch
                    id="meal-plan-reminders"
                    checked={editedUser.notifications.mealPlanReminders}
                    onCheckedChange={(checked) => handleNotificationChange("mealPlanReminders", checked)}
                  />
                ) : (
                  <Badge variant={user.notifications.mealPlanReminders ? "default" : "outline"}>
                    {user.notifications.mealPlanReminders ? "활성화" : "비활성화"}
                  </Badge>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">비밀번호 변경</Button>
        <Button variant="destructive">계정 삭제</Button>
      </CardFooter>
    </Card>
  )
}
